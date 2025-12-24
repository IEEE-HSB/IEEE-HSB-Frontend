import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutContent from "./LayoutContent";
import QueryProvider from "@/providers/QueryProvider";
import AuthContextProvider from "@/context/AuthContext";
import UserProvider from "@/context/UserContext";



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
  description: "Your gateway to IEEE Helwan Stuedent Branch! Find events, workshops, student projects, quizzes, galleries, and everything happening across the IEEE Helwan Student Branch chapters — all in one easy platform.",
  icons: {
    icon: "/assets/logos/ieeeIcon.png",
  },
};


export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="google-site-verification" content="nbk-Ml1nq3z3cP6YcMdFucdSjCJlJ2arVuqz0c1DRW4" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>

          <ThemeProvider>
            <AuthContextProvider>

              <UserProvider>

                <LayoutContent>
                  {children}
                </LayoutContent>
              </UserProvider>


            </AuthContextProvider>
          </ThemeProvider>
        </QueryProvider>

      </body>
    </html >
  );
}
