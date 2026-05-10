"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://138.197.187.123:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            
            // Layout'taki durumu güncellemek için küçük bir gecikme ile refresh veya custom event yapılabilir
            // Basitlik adına sayfayı yeniliyoruz
            window.location.href = "/";
        } else {
            alert("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
        }
    };

    return (
        <main className="max-w-md mx-auto p-4 mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Giriş Yap</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded shadow-sm border border-gray-200">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Kullanıcı Adı</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Şifre</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-2"
                >
                    Giriş Yap
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                Hesabın yok mu? <Link href="/register" className="text-blue-500 hover:underline">Kayıt Ol</Link>
            </p>
        </main>
    );
}
