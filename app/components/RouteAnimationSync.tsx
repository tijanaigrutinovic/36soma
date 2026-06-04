"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function RouteAnimationSync() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const prev = previousPath.current;
    previousPath.current = pathname;

    if (prev === null) return;
    if (pathname !== "/") return;

    const init = (window as Window & { __mainAnimationsInit?: () => void }).__mainAnimationsInit;
    if (!init) return;

    requestAnimationFrame(() => {
      init();
    });
  }, [pathname]);

  return null;
}
