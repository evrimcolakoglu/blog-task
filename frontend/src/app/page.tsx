"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Yazıların tipini (şeklini) belirliyoruz
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Sayfa açıldığında backend'den tüm yazıları çeken kısım
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://138.197.187.123:8080/api/posts");
        if (res.ok) {
          const data = await res.json();
          // Yazıları en yeniden en eskiye sıralayalım (ID'ye göre ters çevirerek)
          setPosts(data.sort((a: Post, b: Post) => b.id - a.id));
        }
      } catch (error) {
        console.error("Yazılar çekilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // ARAMA FİLTRESİ: Kullanıcının yazdığı kelimeyi başlık veya içerikte arar
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="max-w-4xl mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Blog Uygulaması</h1>
        <Link
          href="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
        >
          Yeni Yazı Ekle
        </Link>
      </div>

      {/* ARAMA KUTUSU BURASI */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Yazılarda ara... (Başlık veya içerikte)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-700"
        />
      </div>

      {isLoading ? (
        <p className="text-gray-500 text-center font-medium">Yazılar yükleniyor...</p>
      ) : filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-center bg-gray-50 p-8 rounded-lg border border-gray-200">
          {posts.length === 0
            ? "Henüz hiç blog yazısı yok. İlk yazıyı sen ekle!"
            : "Aradığınız kritere uygun yazı bulunamadı. Lütfen başka bir kelime deneyin."}
        </p>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                Yazar: <span className="font-semibold text-gray-700">{post.author}</span>
              </p>
              <p className="text-gray-700 mb-4 line-clamp-3">
                {/* İçerik çok uzunsa ilk 150 karakterini gösteriyoruz */}
                {post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content}
              </p>
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline inline-flex items-center"
              >
                Devamını Oku <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
