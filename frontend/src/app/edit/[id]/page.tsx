"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const API_URL = (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost"))
    ? process.env.NEXT_PUBLIC_API_URL
    : (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8080` : "http://localhost:8080");

export default function EditPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`${API_URL}/api/posts/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title);
                    setContent(data.content);
                }
            } catch (error) {
                console.error("Veri çekilirken hata oluştu", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) fetchPost();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, content }),
            });

            if (res.ok) {
                router.push(`/posts/${id}`);
                router.refresh();
            } else {
                setIsSaving(false);
                alert("Güncelleme başarısız.");
            }
        } catch (err) {
            setIsSaving(false);
            console.error(err);
            alert("Bağlantı hatası.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-32">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-200 border-t-indigo-500 animate-spin"></div>
                    <span className="text-sm text-slate-400 font-medium">Yazı bilgileri yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Yazıyı Düzenle</h1>
                    <p className="text-sm text-slate-400 mt-1">Değişikliklerinizi kaydedin</p>
                </div>
                <Link href={`/posts/${id}`} className="btn-secondary !px-4 !py-2 !text-xs gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    İptal
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">Başlık</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-modern" required />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">İçerik</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="textarea-modern" required></textarea>
                </div>
                <button type="submit" disabled={isSaving} className="btn-warning w-full !rounded-xl !py-3.5 gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSaving ? (
                        <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>Kaydediliyor...</>
                    ) : (
                        <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Değişiklikleri Kaydet</>
                    )}
                </button>
            </form>
        </div>
    );
}