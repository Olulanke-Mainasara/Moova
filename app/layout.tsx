import { ThemeProvider } from "next-themes";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Custom/Nav/NavBar";
import { Toaster } from "sonner";
import { ViewTransitions } from "next-view-transitions";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Moova",
  description:
    "AI-powered mood-based travel curator that generates personalized destinations, itineraries, and seamless bookings based on how you want to feel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        cssLayerName: "clerk",
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-100 dark:bg-neutral-900`}
        >
          <ViewTransitions>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              <main>{children}</main>
              <Toaster position="top-center" />
            </ThemeProvider>
          </ViewTransitions>
        </body>
      </html>
    </ClerkProvider>
  );
}
