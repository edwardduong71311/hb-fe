"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { mantineHtmlProps, MantineProvider } from "@mantine/core";
import { theme } from "@/theme/config";
import { Provider } from "react-redux";
import { store } from "@/state/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider theme={theme}>
          <Provider store={store}>{children}</Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
