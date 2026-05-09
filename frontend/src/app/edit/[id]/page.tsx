"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const params = useParams(); // URL'deki id'yi almak için kullanıyoruz
    const id = params.id;

    // Sayfa açıldığında mevcut yazıyı veritabanından çekip forma dolduran kısım
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/posts/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title);
                    setContent(data.content);
                    setAuthor(data.author);
                }
            } catch (error) {
                console.error("Veri çekilirken hata oluştu", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    // Form gönderildiğinde veritabanına PUT (Güncelleme) isteği atan kısım
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedPost = { title, content, author };

        const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
        });

        if (res.ok) {
            // Güncelleme başarılıysa tekrar yazının detay sayfasına yönlendir
            router.push(`/posts/${id}`);
            router.refresh();
        } else {
            alert("Güncelleme işlemi sırasında bir hata oluştu.");
        }
    };

    if (isLoading) {
        return <div className="text-center mt-20 text-gray-500 font-semibold text-lg">Yazı bilgileri yükleniyor...</div>;
    }

    return (
        <main className="max-w-2xl mx-auto p-4 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Yazıyı Düzenle</h1>
                <Link href={`/posts/${id}`} className="text-blue-500 hover:underline">
                    &larr; İptal Et ve Geri Dön
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
                        rows={8}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition mt-2"
                >
                    Değişiklikleri Kaydet
                </button>
            </form>
        </main>
    );
}