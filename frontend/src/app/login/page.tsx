"use client";

import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                window.location.href = "/";
            } else {
                setIsLoading(false);
                alert("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Giriş hatası:", error);
            alert("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh] animate-fade-in-up">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800">Tekrar Hoşgeldiniz</h1>
                    <p className="text-sm text-slate-400 mt-1">Hesabınıza giriş yapın</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">Kullanıcı Adı</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-modern" placeholder="kullanici_adi" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-600 mb-2">Şifre</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-modern" placeholder="••••••••" required />
                    </div>
                    <button type="submit" disabled={isLoading} className="btn-primary w-full !rounded-xl !py-3.5 gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                        {isLoading ? (
                            <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>Giriş yapılıyor...</>
                        ) : ("Giriş Yap")}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-slate-400">
                    Hesabın yok mu?{" "}
                    <Link href="/register" className="font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">Kayıt Ol</Link>
                </p>
            </div>
        </div>
    );
}
