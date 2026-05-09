import Link from "next/link";

// Backend'den yazıları çeken fonksiyon
async function getPosts() {
  // cache: 'no-store' ayarı, sayfayı her yenilediğimizde en güncel veriyi çekmesini sağlar
  const res = await fetch("http://localhost:8080/api/posts", { cache: "no-store" });
  if (!res.ok) {
    return [];
  }
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-4 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Blog Uygulaması</h1>
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Yeni Yazı Ekle
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Henüz hiç blog yazısı yok. İlk yazıyı sen ekle!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post: any) => (
            <div key={post.id} className="border border-gray-200 p-4 rounded shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Yazar: {post.author}</span>
                <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                  Devamını Oku &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
