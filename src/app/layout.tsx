import "./globals.css";

import QueryProvider from "@/components/providers/query-provider";

import { ThemeProvider } from "@/components/providers/theme-provider";

import ToasterContainer from "@/components/shared/toaster-container";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <QueryProvider>
            {children}
            <ToasterContainer />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}