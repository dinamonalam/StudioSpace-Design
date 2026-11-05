import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StudioSpace | Peer-to-Peer Creative Workspace & Production Studio Sharing Platform",
  description:
    "Discover, inspect dynamic availability, and reserve premier photo cyc walls, film stages, podcast lounges, and sound suites.",
  keywords: [
    "creative workspace",
    "photo studio rental",
    "sound stage",
    "podcast studio",
    "music suite",
    "production space",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#17191C] text-[#F5F0E8] antialiased selection:bg-[#E7A65A]/30 selection:text-[#E7A65A] flex flex-col justify-between">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                style: {
                  background: "#24272B",
                  color: "#F5F0E8",
                  border: "1px solid #32363C",
                },
              }}
            />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
