import Link from "next/link";
import { notFound } from "next/navigation";
import PostButtons from "./PostButtons"; // Yeni butonlarımızı içeri aktardık

// Backend'den tek bir yazıyı çeken fonksiyon
async function getPost(id: string) {
    const res = await fetch('http://backend:8080/api/posts/' + id)
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
        <main className="max-w-3xl mx-auto p-4 mt-8">
            <Link href="/" className="text-blue-500 hover:underline mb-6 inline-block">
                &larr; Ana Sayfaya Dön
            </Link>

            <article className="bg-white p-8 rounded shadow-sm border border-gray-200">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

                <div className="flex items-center text-sm text-gray-500 mb-8 border-b pb-4">
                    <span className="font-semibold text-gray-700 mr-2">Yazar: {post.author}</span>
                    <span>|</span>
                    <span className="ml-2">Tarih: {formattedDate}</span>
                </div>

                <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </div>

                {/* BUTONLARI BURAYA EKLEDİK */}
                <PostButtons id={post.id} author={post.author} />
            </article>
        </main>
    );
}