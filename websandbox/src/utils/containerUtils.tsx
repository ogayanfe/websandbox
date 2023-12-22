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

export async function destroyContainer() {
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
      console.log("Dependecies Installed");
      return;
    }
    console.log("Retrying install");
  }
}

export async function startDevServer() {
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
  await startDevServer();
}

const writeTimeOutStore = new Map<string, number>();
export async function updateContainerFile(id: string, path: string, content: string) {
  clearTimeout(writeTimeOutStore.get(id));
  const value = setTimeout(async () => {
    const container = await getWebContainerInstance();
    container.fs.writeFile(path, content);
  }, 200);
  writeTimeOutStore.set(id, value);
}

export async function createContainerFile(path: string, content?: string) {
  const container = await getWebContainerInstance();
  container.fs.writeFile(path, content || "");
}

export async function deleteContainerNode(path: string) {
  const container = await getWebContainerInstance();
  container.fs.rm(path, { recursive: true });
}

export async function createContainerFolder(path: string) {
  const container = await getWebContainerInstance();
  container.fs.mkdir(path, { recursive: true });
}

export async function renameContainerNode(path: string[], name: string) {
  const newPath = [...path];
  newPath[path.length - 1] = name;
  const container = await getWebContainerInstance();

  container.spawn("mv", ["/" + path.join("/"), "/" + newPath.join("/")]);
}

export async function mountFiles(files: FileSystemTree) {
  const container = await getWebContainerInstance();
  container.mount(files);
}
