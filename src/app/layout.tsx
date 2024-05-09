"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layouts";
import ThemeProvider from "../theme";
import { ProSidebarProvider } from "react-pro-sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { SnackbarContextProvider } from "@/context/snackbarContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <SnackbarContextProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ProSidebarProvider>
                  {pathname === "/login" || pathname === "/register" ? (
                    children
                  ) : (
                    <Layout>{children}</Layout>
                  )}
                </ProSidebarProvider>
              </LocalizationProvider>
            </SnackbarContextProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
