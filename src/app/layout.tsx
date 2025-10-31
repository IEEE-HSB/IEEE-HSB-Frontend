import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutContent from "./LayoutContent";
import QueryProvider from "@/providers/QueryProvider";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE HSB",
  description: "lorem",
  icons: {
    icon: "../assets/icons/ieeeLogo.tsx",
  },
};


export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <QueryProvider>
            <LayoutContent>
              {children}


            </LayoutContent>

          </QueryProvider>

        </ThemeProvider>

      </body>
    </html >
  );
}
