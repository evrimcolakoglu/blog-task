"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = (process.env.NEXT_PUBLIC_API_URL && !process.env.NEXT_PUBLIC_API_URL.includes("localhost"))
    ? process.env.NEXT_PUBLIC_API_URL
    : (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8080` : "http://localhost:8080");

export default function PostButtons({ id, author }: { id: number, author: string }) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentUser(localStorage.getItem("username"));
    }, []);

    const handleDelete = async () => {
        if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.push("/");
                router.refresh();
            } else {
                alert("Silme işlemi başarısız oldu.");
            }
        } catch (err) {
            console.error(err);
            alert("Bağlantı hatası oluştu.");
        }
    };

    return (
        <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
            <Link href={`/edit/${id}`} className="btn-warning gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Düzenle
            </Link>
            <button onClick={handleDelete} className="btn-danger gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Sil
            </button>
        </div>
    );
}