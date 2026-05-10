"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // GİRİŞ KONTROLÜNÜ İPTAL ETTİK, DİREKT GÖNDERİYORUZ
        try {
            const res = await fetch("http://138.197.187.123:8080/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Yazar adını zorunlu olarak "Anonim" veya "Evrim" yolluyoruz
                body: JSON.stringify({ title, content, author: "Evrim" }),
            });

            if (res.ok) {
                router.push("/");
            } else {
                alert("Backend'e kayıt yapılamadı, ama sistem çalışıyor.");
            }
        } catch (err) {
            console.error(err);
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
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">İçerik</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-xl h-48 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-colors">
                    Kaydet ve Yayınla
                </button>
            </form>
        </div>
    );
}