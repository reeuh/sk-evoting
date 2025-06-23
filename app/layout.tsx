"use client";
import type React from "react"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"
import { Toaster } from 'sonner'
import { SessionProvider } from "next-auth/react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
