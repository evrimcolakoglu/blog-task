# DevBlog - Modern Topluluk Blog Platformu

DevBlog, herkesin özgürce ve anında fikirlerini paylaşabileceği, hız ve kullanıcı deneyimi odaklı, modern bir blog platformudur. Bu proje, staj değerlendirme süreci kapsamında tam yığın (full-stack) geliştirme yetkinliklerini en güncel teknolojilerle sergilemek amacıyla hazırlanmıştır.

## 🚀 Canlı Demo
Uygulamanın yayındaki haline şu adresten ulaşabilirsiniz:  
**[http://138.197.187.123:3000](http://138.197.187.123:3000)**

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji |
|--------|-----------|
| **Frontend** | Next.js 15+ (App Router), React 19, Tailwind CSS 3 |
| **Backend** | Spring Boot 3.2 (Java 17), Spring Security |
| **Veritabanı** | PostgreSQL 15 |
| **Konteyner** | Docker & Docker Compose |
| **API İletişimi** | Next.js API Routes (Internal Proxy) |
| **CI/CD** | GitHub Actions |
| **Sunucu** | DigitalOcean (Ubuntu VPS) |

---

## 📋 Özellikler

- ✅ **Tam CRUD Yönetimi:** Yazı ekleme, listeleme, detay okuma, düzenleme ve silme işlemleri.
- ✅ **Şifresiz Hızlı Erişim:** Kayıt veya giriş zorunluluğu olmadan anında içerik üretimi.
- ✅ **Gelişmiş Arama:** Başlık ve içerik üzerinden anlık, büyük/küçük harf duyarsız arama motoru.
- ✅ **Güvenli API Proxy:** Tarayıcı ile backend arasındaki iletişimi Next.js üzerinden yöneten güvenli proxy yapısı.
- ✅ **Modern Arayüz:** Minimalist, duyarlı (responsive) ve premium kullanıcı deneyimi.
- ✅ **Konteyner Altyapısı:** Tüm sistemin Docker Compose ile tek komutla ayağa kalkması.
- ✅ **Otomatik CI/CD:** GitHub Actions ile her güncellemede otomatik derleme ve kalite kontrolü.

---

## 🧠 Mimari Karar Kaydı (Architecture Decision Record - ADR)

**Kimlik Doğrulama (Auth) Altyapısı Hakkında Geliştirici Notu:**
Projenin geliştirme sürecinde JWT tabanlı kullanıcı kayıt ve giriş (Authentication & Authorization) sistemi tasarlanmış ve hem Frontend hem de Backend katmanlarına entegre edilmiştir. Ancak canlı ortama (production) geçiş öncesi yapılan son kararlılık testlerinde, Spring Security yetkilendirme filtreleri ile Frontend arasındaki senkronizasyonda stabilite sorunları gözlemlenmiştir.

Teslimat süresine (deadline) sadık kalmak ve projenin temel gereksinimlerinin (CRUD, Arama, Docker, CI/CD) kusursuz çalıştığı kararlı (stable) bir sürüm sunmak adına, risk yönetimi prensipleri gereği yetkilendirme özelliği bu sürümde bilerek devre dışı bırakılmış (rollback) ve "Şifresiz Hızlı Erişim" modeline geçilmiştir. İlgili altyapı kodlarda mevcut olup, planlanan ilk geliştirmelerde aktif edilecektir.

---

## 🏗️ Mimari Yapı

```text
blog-task/
├── backend/                  # Spring Boot REST API
│   ├── src/main/java/com/blog/backend/
│   │   ├── controller/       # PostController (Halka açık uç noktalar)
│   │   ├── entity/           # Post (Entity modelleri)
│   │   ├── repository/       # PostRepository (JPA Data)
│   │   └── service/          # PostService (İş mantığı)
│   └── Dockerfile
├── frontend/                 # Next.js (App Router)
│   ├── src/app/
│   │   ├── api/              # API Proxy Routes (Sunucu tarafı yönlendirme)
│   │   ├── page.tsx          # Ana sayfa (Listeleme + Arama)
│   │   ├── create/           # Yazı oluşturma formu
│   │   ├── edit/[id]/        # Yazı düzenleme ekranı
│   │   └── posts/[id]/       # Yazı detay sayfası
│   └── Dockerfile
├── docker-compose.yml        # PostgreSQL + Backend + Frontend orkestrasyonu
├── .github/workflows/        # GitHub Actions CI süreçleri
└── README.md
