"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost"))
    ? process.env.NEXT_PUBLIC_API_URL
    : (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8080` : "http://localhost:8080");

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content, author: author || "Anonim" }),
            });

            if (res.ok) {
                router.push("/");
                router.refresh();
            } else {
                setIsLoading(false);
                alert("Yazı yayınlanırken bir hata oluştu.");
            }
        } catch (err) {
            setIsLoading(false);
            console.error(err);
            alert(`Sunucuya bağlanılamadı. (Denenen Adres: ${API_URL})`);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Yeni Yazı Ekle</h1>
                    <p className="text-slate-500 mt-1">Düşüncelerinizi toplulukla paylaşın.</p>
                </div>
                <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 px-4 py-2 bg-slate-100 rounded-lg">
                    ← Geri Dön
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Başlık</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Yazı başlığı..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Yazar Adı</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="İsminiz (Boş bırakılırsa Anonim)..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">İçerik</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-xl h-48 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        placeholder="Yazı içeriği..."
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                    {isLoading ? "Yayınlanıyor..." : "Kaydet ve Yayınla"}
                </button>
            </form>
        </div>
    );
}