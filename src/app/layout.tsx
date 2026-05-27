import "./globals.css";

import QueryProvider from "@/components/providers/query-provider";

import { ThemeProvider } from "@/components/providers/theme-provider";

import ToasterContainer from "@/components/shared/toaster-container";
import { AuthProvider } from "@/context/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  //suppressHydrationWarning suppresses the warning about change in theme , and difference form html
  // query provider used to give ability to use additional query related hooks
  // theme provider added to add theme toggeling functionality
  // toaster container added to display the toasts that are added

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <AuthProvider>
            <QueryProvider>
              {children}
              <ToasterContainer />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}