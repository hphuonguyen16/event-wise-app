"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layouts";
import ThemeProvider from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";
import { SnackbarContextProvider } from "@/context/snackbarContext";
import { usePathname } from "next/navigation";
import UserLayout from "@/layouts/UserLayout";
import {MapObjectProvider} from "@/context/MapObjectContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutPaths = ["/login", "/register", "/seats"];
  const userLayoutPaths = ["/organization/info", "/home", "/event/"];
  console.log(pathname);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SnackbarContextProvider>
            <MapObjectProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {noLayoutPaths.includes(pathname) ? (
                  <ThemeProvider>{children}</ThemeProvider>
                ) : userLayoutPaths.includes(pathname) ||
                  pathname.startsWith("/event/") ||
                  pathname.startsWith("/me") ||
                  pathname.startsWith("/home") ? (
                  <ThemeProvider>
                    <UserLayout>{children}</UserLayout>
                  </ThemeProvider>
                ) : (
                  <ThemeProvider>
                    <Layout>{children}</Layout>
                  </ThemeProvider>
                )}
              </LocalizationProvider>
            </MapObjectProvider>
          </SnackbarContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
