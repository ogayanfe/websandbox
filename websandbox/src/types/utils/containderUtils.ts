type containerEventName =
  | "boot-start"
  | "boot-finished"
  | "install-start"
  | "install-finished"
  | "server-starting"
  | "server-started";

interface containerEventStore {
  "boot-start": (() => any)[];
  "boot-finished": (() => any)[];
  "install-start": (() => any)[];
  "install-finished": (() => any)[];
  "server-starting": (() => any)[];
  "server-started": (() => any)[];
}
export type { containerEventName, containerEventStore };
