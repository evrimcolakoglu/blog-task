"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost"))
    ? process.env.NEXT_PUBLIC_API_URL
    : (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8080` : "http://localhost:8080");

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentUser(storedUsername);
    }

    const dynamicApiUrl = process.env.NEXT_PUBLIC_API_URL || 
        (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8080` : "http://localhost:8080");

    fetch(`${dynamicApiUrl}/api/posts`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Veri çekme hatası:", err);
        setIsLoading(false);
      });
  }, []);

  // --- Büyük/Küçük Harf Duyarsız Arama ---
  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(search) ||
      post.content.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (id: number) => {
    if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bu işlem için giriş yapmalısınız.");
        return;
      }
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        const errorText = await res.text();
        alert("Silme başarısız: " + errorText);
      }
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('tr-TR', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-10">
      {/* ─── HERO ─── */}
      <section className="text-center py-16 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-600 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
          Topluluk blogu aktif
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 leading-[1.1]">
          Fikirlerinizi{" "}
          <span className="gradient-text">Özgürce</span>
          <br className="hidden sm:block" />
          {" "}Paylaşın.
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          Teknoloji, yazılım ve hayata dair düşüncelerinizi yazın.
          Topluluğumuza katılın ve ilham verin.
        </p>
      </section>

      {/* ─── SEARCH ─── */}
      <div className="relative max-w-xl mx-auto animate-fade-in-up stagger-2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Yazılarda ara..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all duration-300 text-slate-700 text-sm placeholder-slate-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* ─── POST LIST ─── */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-200 border-t-indigo-500 animate-spin"></div>
            <span className="text-sm text-slate-400 font-medium">Yazılar yükleniyor...</span>
          </div>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`animate-fade-in-up stagger-${Math.min(index + 1, 6)}`}
            >
              <div className="group bg-white p-6 rounded-2xl border border-slate-100 card-hover flex flex-col h-full">
                {/* Card Top */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-sm">
                    <span className="text-[11px] text-white font-bold">
                      {post.author?.charAt(0).toUpperCase() || "?"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                    {post.createdAt && (
                      <span className="text-[10px] text-slate-400">{formatDate(post.createdAt)}</span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 mb-4">
                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-300 mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <Link
                    href={`/posts/${post.id}`}
                    className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
                  >
                    Devamını Oku
                    <svg className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-xs font-medium text-slate-300 hover:text-rose-500 transition-colors duration-200"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center animate-float">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">Henüz yazı bulunamadı</h3>
          <p className="text-sm text-slate-400">Aradığınız kriterlere uygun içerik yok veya henüz hiç yazı eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
