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
    window.history.pushState(null, "", to);
    setPath(to);
  };

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
  return current === path ? element : null;
};

// Helper function to parse sample route
export const useSampleRoute = () => {
  const { path } = useRouter();

  // Parse route like /example.samples/cubeScene
  const match = path.match(/^\/([^\/]+)\/([^\/]+)$/);

  if (match) {
    const [, filePath, functionName] = match;
    return { filePath, functionName, isValid: true };
  }

  return { filePath: null, functionName: null, isValid: false };
};

// Helper function to build sample route
export const buildSampleRoute = (filePath: string, functionName: string) => {
  // Strip extension and .samples/.sample suffix from file path
  const filePathWithoutExt = filePath
    .replace(/\.(ts|js|tsx|jsx)$/, '') // Strip extension
    .replace(/\.samples?$/, ''); // Strip .samples or .sample
  return `/${filePathWithoutExt}/${functionName}`;
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
