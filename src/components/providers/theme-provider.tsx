"use client";

import * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Uses themeprovider provided by next theme provider component lets us set the theme of our website
  // attribute defines that we are using class based css , and enable system helps detect device theme
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="white"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}