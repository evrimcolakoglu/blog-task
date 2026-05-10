"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("http://138.197.187.123:8080/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            alert("Kayıt başarılı! Lütfen giriş yapın.");
            router.push("/login");
        } else {
            const errText = await res.text();
            alert("Kayıt başarısız: " + errText);
        }
    };

    return (
        <main className="max-w-md mx-auto p-4 mt-16">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Kayıt Ol</h1>
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
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition mt-2"
                >
                    Kayıt Ol
                </button>
            </form>
            <p className="text-center mt-4 text-gray-600">
                Zaten hesabın var mı? <Link href="/login" className="text-blue-500 hover:underline">Giriş Yap</Link>
            </p>
        </main>
    );
}
