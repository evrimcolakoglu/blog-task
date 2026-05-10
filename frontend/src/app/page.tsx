"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Backend IP adresin üzerinden verileri çekiyoruz
    fetch("http://138.197.187.123:8080/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  // --- KRİTİK: Büyük/Küçük Harf Duyarsız Arama ---
  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(search) ||
      post.content.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (id: number) => {
    if (confirm("Bu yazıyı silmek istediğinize emin misiniz?")) {
      await fetch(`http://138.197.187.123:8080/api/posts/${id}`, { method: "DELETE" });
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          Fikirlerinizi <span className="text-blue-600">Özgürce</span> Paylaşın.
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Teknoloji, yazılım ve hayata dair en güncel blog yazıları burada.
          Siz de topluluğumuza katılın.
        </p>
      </section>

      {/* 2. MODERN ARAMA ÇUBUĞU */}
      <div className="relative max-w-2xl mx-auto group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          <span className="text-xl">🔍</span>
        </div>
        <input
          type="text"
          placeholder="Yazılarda ara (başlık veya içerik)..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm outline-none ring-offset-2 focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all text-slate-700"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 3. YAZI LİSTESİ (GRID) */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-3">
                  {post.title}
                </h2>
                <p className="text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                <span className="text-sm font-medium text-slate-400">👤 {post.author}</span>
                <div className="flex gap-3">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Devamını Oku →
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-sm font-semibold text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 4. BOŞ DURUM (EMPTY STATE) */
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-bold text-slate-800">Henüz bir yazı bulunamadı</h3>
          <p className="text-slate-500">Aradığınız kriterlere uygun içerik yok veya henüz hiç yazı eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
