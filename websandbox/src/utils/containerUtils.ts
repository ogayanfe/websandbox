import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { Mutex } from "async-mutex";
import {
  containerEventName,
  containerEventStore,
} from "../types/utils/containderUtils";

class ContainerEventsHandler {
  eventStore: containerEventStore;

  constructor() {
    this.eventStore = this.getEvents();
  }

  addEvent(type: containerEventName, event: () => unknown) {
    this.eventStore[type].push(event);
  }
  fireEvent(type: containerEventName) {
    for (const e of this.eventStore[type]) e();
  }

  private getEvents() {
    return {
      "boot-start": [],
      "boot-finished": [],
      "install-start": [],
      "install-finished": [],
      "server-starting": [],
      "server-started": [],
    };
  }

  public resetEvents() {
    this.eventStore = this.getEvents();
  }
}

let containerInstance: WebContainer | null = null;

const mutex = new Mutex();
export const containerEventHandler = new ContainerEventsHandler();

export default async function getWebContainerInstance() {
  await mutex.acquire();
  if (!containerInstance) {
    containerEventHandler.fireEvent("boot-start");
    console.log("Booting container");
    containerInstance = await WebContainer.boot();
    containerEventHandler.fireEvent("boot-finished");
    console.log("Container Booted");
  }
  mutex.release();
  return containerInstance;
}

export async function destroyContainer() {
  if (!containerInstance) return;
  console.log("Destroying container");
  containerInstance.teardown();
  containerInstance = null;
  installedDependencies = false;
  installMutex.release();
}

let installedDependencies = false;
const installMutex = new Mutex();
export async function installDependencies() {
  await installMutex.acquire();
  const webcontainerInstance = await getWebContainerInstance();
  if (installedDependencies) return;
  containerEventHandler.fireEvent("install-start");
  console.log("Installing dependencies");

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const installProcess = await webcontainerInstance.spawn("npm", [
      "install",
      "vite",
    ]);

    const installExitCode = await installProcess.exit;

    if (installExitCode === 0) {
      installedDependencies = true;
      installMutex.release();
      containerEventHandler.fireEvent("install-finished");
      console.log("Dependecies Installed");
      return;
    }
    console.log("Retrying install");
  }
}

async function configureVite() {
  console.log("Configuring Vite");
  const webcontainerInstance = await getWebContainerInstance();
  // Forces vite to show 404 page when application routes to non-existent route
  const content =
    "import { defineConfig } from 'vite';export default defineConfig({appType: 'mpa'})";
  await webcontainerInstance.fs.writeFile("/vite.config.js", content);
}

export async function startDevServer() {
  const webcontainerInstance = await getWebContainerInstance();
  containerEventHandler.fireEvent("server-starting");

  await configureVite();

  const serverStart = await webcontainerInstance.spawn("npx", ["vite", "."]);
  serverStart.output.pipeTo(
    new WritableStream({
      write: (c) => console.log(c),
    })
  );
  containerEventHandler.fireEvent("server-started");
  console.log("Server started");
}

export async function start() {
  await installDependencies();
  await startDevServer();
}

const writeTimeOutStore = new Map<string, number>();
export async function updateContainerFile(
  id: string,
  path: string,
  content: string
) {
  clearTimeout(writeTimeOutStore.get(id));
  const value = setTimeout(async () => {
    const container = await getWebContainerInstance();
    container.fs.writeFile(path, content);
  }, 200);
  writeTimeOutStore.set(id, value);
}

export async function createContainerFile(path: string, content?: string) {
  const container = await getWebContainerInstance();
  container.fs.writeFile(path, content ?? "");
}

export async function deleteContainerNode(path: string) {
  const container = await getWebContainerInstance();
  container.fs.rm(path, { recursive: true });
}

export async function createContainerFolder(path: string) {
  const container = await getWebContainerInstance();
  container.fs.mkdir(path, { recursive: true });
}

export async function mountFiles(files: FileSystemTree) {
  const container = await getWebContainerInstance();
  container.mount(files);
}
