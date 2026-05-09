"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Formdaki verileri bir araya getiriyoruz
        const newPost = { title, content, author };

        // Arka planda çalışan Spring Boot (Backend) sunucumuza veriyi POST ediyoruz
        const res = await fetch("http://localhost:8080/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        });

        if (res.ok) {
            // Başarılı olursa ana sayfaya yönlendir ve sayfayı yenile
            router.push("/");
            router.refresh();
        } else {
            alert("Bir hata oluştu. Lütfen veritabanı bağlantını kontrol et.");
        }
    };

    return (
        <main className="max-w-2xl mx-auto p-4 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Yeni Blog Yazısı</h1>
                <Link href="/" className="text-blue-500 hover:underline">
                    &larr; Ana Sayfaya Dön
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded shadow-sm border border-gray-200">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Başlık</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Yazar</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">İçerik</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-2"
                >
                    Kaydet ve Yayınla
                </button>
            </form>
        </main>
    );
}