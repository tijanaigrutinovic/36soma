"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPathname } from "../lib/locale";

export function LocaleLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = localeFromPathname(pathname ?? "/");
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
