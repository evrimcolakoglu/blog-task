"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <title>DevBlog | Modern Paylaşım Platformu</title>
        <meta name="description" content="Düşüncelerinizi paylaşın, dünyayla etkileşime geçin." />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 bg-dots">

        {/* ─── NAVBAR ─── */}
        <nav className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
            ? "glass shadow-lg shadow-indigo-100/20 border-b border-white/40"
            : "bg-white/60 backdrop-blur-sm border-b border-slate-100"
          }`}>
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200/50 group-hover:shadow-lg group-hover:shadow-indigo-300/50 transition-all duration-300 group-hover:scale-105">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="text-lg font-bold gradient-text tracking-tight">DevBlog</span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/" className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200">
                Yazılar
              </Link>

              {/* DOĞRUDAN YENİ YAZI BUTONU (GİRİŞ İSTEMEZ) */}
              <Link href="/create" className="btn-primary !px-4 !py-2 !text-xs !rounded-lg flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                <span className="hidden sm:inline">Yeni Yazı Ekle</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* ─── PAGE CONTENT ─── */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* ─── FOOTER ─── */}
        <footer className="border-t border-slate-100 bg-white/60 backdrop-blur-sm py-10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">D</span>
                </div>
                <span className="text-sm font-semibold gradient-text">DevBlog</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                © 2026 DevBlog Platformu · Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
