import { createContext, useContext, useState } from "react";

interface SandboxContextType {
  visibleSidebar: Boolean;
  showSidebar: () => void;
  hideSidebar: () => void;
  toggleSidebar: () => void;
}

const sandboxContext = createContext<SandboxContextType | null>(null);

function SandboxContextProvider({ children }: { children: React.ReactNode }) {
  const [visibleSidebar, setVisibleSidebar] = useState<Boolean>(true);
  const context = {
    visibleSidebar,
    showSidebar: () => setVisibleSidebar(true),
    hideSidebar: () => setVisibleSidebar(false),
    toggleSidebar: () => setVisibleSidebar((p) => !p),
  };
  return <sandboxContext.Provider value={context}>{children}</sandboxContext.Provider>;
}

function useSandboxContext() {
  return useContext(sandboxContext);
}

export default useSandboxContext;
export { SandboxContextProvider, sandboxContext };
