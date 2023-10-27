"use client";

import { ThemeProvider } from "next-themes";

export function Provider({ children }: any) {
  return <>
    <ThemeProvider>{children}</ThemeProvider>;
  </>
}