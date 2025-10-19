import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tree to Image Generator",
  description:
    "Convert file trees and structures into beautiful, shareable images. Perfect for documentation, portfolios, and presentations.",
  keywords: "tree generator, file structure, image generator, developer tools",
  openGraph: {
    title: "Tree to Image Generator",
    description: "Convert file trees and structures into beautiful, shareable images.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} ${geistMono.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

        {children}
<Toaster position='bottom-center' theme='dark' richColors />
        <Analytics />
        </ThemeProvider>
      </body>
      </html>
      </ClerkProvider>
  )
}

