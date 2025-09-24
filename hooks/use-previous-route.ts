// hooks/use-previous-route.ts
import { useEffect, useRef, useState } from "react";
import { usePathname } from "expo-router";

export function usePreviousRoute() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      setPrevious(prevPathRef.current); // save the last one
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return previous;
}
