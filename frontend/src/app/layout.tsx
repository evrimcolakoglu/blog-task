"use client";

import type { Metadata } from "next";
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

// Layout Client Component olduğu için Metadata'yı export edemeyiz. Onu ayrı bir layout'ta tutmak gerekir ama basitlik için kaldırıyoruz.
// Next.js app router'da metadata genelde ayrı bir server component'ta tutulur, fakat tek layout olduğu için doğrudan title ekleyeceğiz.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };
  return (
    <html
      lang="tr" // Dili Türkçe yaptık
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* bg-slate-50 ile arkaplanı hafif gri yaparak kartların öne çıkmasını sağladık */}
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">

        {/* --- NAVBAR BAŞLANGICI --- */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo Alanı */}
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              DevBlog.
            </Link>

            {/* Navigasyon Linkleri ve Aksiyon Butonu */}
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                Yazılar
              </Link>
              {username ? (
                <>
                  <span className="text-sm font-medium text-slate-600">👤 {username}</span>
                  <Link
                    href="/create"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95"
                  >
                    Yeni Yazı Ekle
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
                    Giriş Yap
                  </Link>
                  <Link href="/register" className="text-sm font-medium text-green-600 hover:underline">
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        {/* --- NAVBAR BİTİŞİ --- */}

        {/* Sayfa İçerikleri */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Basit ve Şık Bir Footer */}
        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="max-w-5xl mx-auto px-4 text-center text-slate-500 text-sm font-medium">
            © 2026 DevBlog Platformu. Tüm hakları saklıdır.
          </div>
        </footer>

      </body>
    </html>
  );
}
