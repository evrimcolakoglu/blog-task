"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Lütfen giriş yapın!");
            router.push("/login");
            return;
        }

        setIsLoading(true);
        const newPost = { title, content };

        const res = await fetch(`${API_URL}/api/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newPost),
        });

        if (res.ok) {
            router.push("/");
            router.refresh();
        } else {
            setIsLoading(false);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Yeni Yazı Oluştur</h1>
                    <p className="text-sm text-slate-400 mt-1">Düşüncelerinizi topluluğumuzla paylaşın</p>
                </div>
                <Link href="/" className="btn-secondary !px-4 !py-2 !text-xs gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Geri Dön
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Başlık</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-modern" placeholder="Yazınıza çekici bir başlık verin..." required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">İçerik</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="textarea-modern" placeholder="Yazınızın içeriğini buraya yazın..." required></textarea>
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary w-full !rounded-xl !py-3.5 gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isLoading ? (
                        <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>Yayınlanıyor...</>
                    ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>Kaydet ve Yayınla</>
                    )}
                </button>
            </form>
        </div>
    );
}