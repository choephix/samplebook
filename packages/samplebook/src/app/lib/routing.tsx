import { useEffect, useState, createContext, useContext, ReactNode } from "react";

const RouterCtx = createContext<{ path: string; navigate: (to: string) => void } | undefined>(undefined);

export const Router = ({ children }: { children: ReactNode }) => {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to: string) => {
    console.log("🚀 navigate", to);
    
    window.history.pushState(null, "", to);
    setPath(to);
  };

  console.log("🔄 Router render - current path:", path);

  return (
    <RouterCtx.Provider value={{ path, navigate }}>
      {children}
    </RouterCtx.Provider>
  );
};

export const useRouter = () => {
  const ctx = useContext(RouterCtx);
  if (!ctx) throw new Error("useRouter must be used within a Router");
  return ctx;
};

export const Route = ({ path, element }: { path: string; element: ReactNode }) => {
  const { path: current } = useRouter();
  console.log("🔍 Route check:", { routePath: path, currentPath: current, matches: current === path });
  return current === path ? element : null;
};

// Helper function to parse sample route
export const useSampleRoute = () => {
  const { path } = useRouter();
  console.log("📍 useSampleRoute path:", path);

  // Parse route like /samples/example.samples/cubeScene or /example.samples/cubeScene
  const match = path.match(/^\/(?:samples\/)?([^\/]+)\/([^\/]+)$/);

  if (match) {
    const [, filePath, functionName] = match;
    console.log("📍 Parsed route:", { filePath, functionName });
    return { filePath, functionName, isValid: true };
  }

  console.log("📍 No route match found");
  return { filePath: null, functionName: null, isValid: false };
};

// Helper function to build sample route
export const buildSampleRoute = (filePath: string, functionName: string) => {
  // Strip extension and .samples/.sample suffix from file path
  const filePathWithoutExt = filePath
    .replace(/\.(ts|js|tsx|jsx)$/, '') // Strip extension
    .replace(/\.samples?$/, ''); // Strip .samples or .sample
  return `/samples/${filePathWithoutExt}/${functionName}`;
};

export const Link = ({ to, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; children: ReactNode }) => {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      {...props}
      onClick={e => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
