import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { Mutex } from "async-mutex";

let containerInstance: WebContainer | null = null;

const mutex = new Mutex();

export default async function getWebContainerInstance() {
  await mutex.acquire();
  if (!containerInstance) {
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

export async function installDependencies(retryTimes: number) {
  const webcontainerInstance = await getWebContainerInstance();
  console.log("Installing dependencies");

  for (let i = retryTimes; i > 0; i--) {
    const installProcess = await webcontainerInstance.spawn("npm", ["install", "live-server"]);
    const installExitCode = await installProcess.exit;

    if (installExitCode === 0) return;

    console.log("Retrying install");
  }

  throw new Error("Unable to run npm install");
}

export async function startDevServer() {
  const webcontainerInstance = await getWebContainerInstance();
  await webcontainerInstance.spawn("live-server", ["."]);
}

export async function start(files: FileSystemTree) {
  const container = await getWebContainerInstance();
  container.mount(files);
  await installDependencies(5);
  console.log("Dependecies Installed");
  await startDevServer();
}
