import Link from "next/link";
import { notFound } from "next/navigation";
import PostButtons from "./PostButtons";

// Backend'den tek bir yazıyı çeken fonksiyon (sunucu tarafında çalışır)
async function getPost(id: string) {
    // Docker içinde çalışırken internal URL kullan, yoksa public URL kullan
    const baseUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const res = await fetch(`${baseUrl}/api/posts/${id}`, { cache: "no-store" });
    if (!res.ok) {
        return null;
    }
    return res.json();
}

export default async function PostDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const post = await getPost(resolvedParams.id);

    if (!post) {
        notFound();
    }

    // Tarihleri Türkiye formatına çevirme
    const formattedDate = new Date(post.createdAt).toLocaleDateString('tr-TR', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    return (
        <div className="max-w-3xl mx-auto">
            <Link href="/" className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-500 transition-colors mb-8">
                <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Ana Sayfaya Dön
            </Link>

            <article className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                <div className="p-8 sm:p-10">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-md shadow-indigo-200/40">
                            <span className="text-sm text-white font-bold">
                                {post.author?.charAt(0).toUpperCase() || "?"}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">{post.author}</span>
                            <span className="text-xs text-slate-400">{formattedDate}</span>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-700 leading-[1.85] whitespace-pre-wrap text-[15px]">
                        {post.content}
                    </div>

                    <PostButtons id={post.id} author={post.author} />
                </div>
            </article>
        </div>
    );
}