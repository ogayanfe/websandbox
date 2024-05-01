import { UserType } from "./utils/authUtils";

interface WebSandboxType {
  id: number;
  title: string;
  files: JSON | null;
  created: string;
  last_updated: string;
  owner: UserType;
  starred: boolean;
}

interface FolderListElementComponentType {
  info: WebSandboxType;
  onDelete: () => void;
  deleteSandbox?: (
    id: number,
    title: string,
    onSuccess: () => void
  ) => Promise<void>;
}

export type { WebSandboxType, FolderListElementComponentType };
