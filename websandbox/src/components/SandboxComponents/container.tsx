import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { Mutex } from "async-mutex";

let containerInstance: WebContainer | null = null;

const mutex = new Mutex();

export default async function getWebContainerInstance() {
  await mutex.acquire();
  if (!containerInstance) {
    console.log("Booting container");
    containerInstance = await WebContainer.boot();
    console.log("Container Booted");
  }
  mutex.release();
  return containerInstance;
}

export async function clearContainerInstance() {
  if (!containerInstance) return;
  containerInstance.teardown();
  containerInstance = null;
}

let installedDependencies = false;
const installMutex = new Mutex();
export async function installDependencies() {
  await installMutex.acquire();
  const webcontainerInstance = await getWebContainerInstance();

  if (installedDependencies) return;
  console.log("Installing dependencies");
  while (true) {
    const installProcess = await webcontainerInstance.spawn("npm", ["install", "vite"]);

    const installExitCode = await installProcess.exit;

    if (installExitCode === 0) {
      installedDependencies = true;
      installMutex.release();
      return;
    }
    console.log("Retrying install");
  }
}

export async function startDevServer() {
  console.log("Starting server");
  const webcontainerInstance = await getWebContainerInstance();
  const serverStart = await webcontainerInstance.spawn("npx", ["vite", "."]);
  serverStart.output.pipeTo(
    new WritableStream({
      write: (c) => console.log(c),
    })
  );
  console.log("Server started");
}

export async function start(files: FileSystemTree) {
  const container = await getWebContainerInstance();
  container.mount(files);
  await installDependencies();
  console.log("Dependecies Installed");
  await startDevServer();
}
