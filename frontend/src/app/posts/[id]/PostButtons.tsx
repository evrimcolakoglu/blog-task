"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function PostButtons({ id, author }: { id: number, author: string }) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        setCurrentUser(localStorage.getItem("username"));
    }, []);

    const handleDelete = async () => {
        // Kullanıcıya yanlışlıkla silmemesi için bir uyarı çıkarıyoruz
        const isConfirmed = confirm("Bu yazıyı silmek istediğine emin misin?");

        if (isConfirmed) {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Lütfen giriş yapın!");
                return;
            }

            // Spring Boot'a DELETE isteği atıyoruz
            const res = await fetch(`http://138.197.187.123:8080/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                // Silme başarılıysa ana sayfaya dön ve sayfayı yenile
                router.push("/");
                router.refresh();
            } else {
                alert("Silme işlemi sırasında bir hata oluştu.");
            }
        }
    };

    if (currentUser !== author) {
        return null; // Yazar giriş yapan kişi değilse butonları gösterme
    }

    return (
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link
                href={`/edit/${id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
            >
                Yazıyı Düzenle
            </Link>
            <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
            >
                Yazıyı Sil
            </button>
        </div>
    );
}