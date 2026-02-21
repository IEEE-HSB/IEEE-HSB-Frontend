import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import LayoutContent from "./LayoutContent";
import QueryProvider from "@/providers/QueryProvider";
import AuthContextProvider from "@/context/AuthContext";
import { QuizzesProvider } from "@/context/QuizzesContext";
import UserProvider from "@/context/UserContext";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE Helwan Student Branch",
  description: "Your gateway to IEEE Helwan Student Branch! Find events, workshops, student projects, quizzes, galleries, and everything happening across the IEEE Helwan Student Branch chapters — all in one easy platform.",
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
      {/*  Google tag (gtag.js) */}
      <Script strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-HQYJ619QV9"></Script>
      <Script id="gtag-init" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HQYJ619QV9');
          `}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>

          <ThemeProvider>
            <AuthContextProvider>

              <UserProvider>

                <LayoutContent>
                  <QuizzesProvider>
                  {children}
                  </QuizzesProvider>
                </LayoutContent>
              </UserProvider>


            </AuthContextProvider>
          </ThemeProvider>
        </QueryProvider>

      </body>
    </html >
  );
}
