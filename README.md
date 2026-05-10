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

## 🏗️ Mimari Yapı

```
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
```

---

## 📦 Proje Kurulumu (Yerel Ortam)

### Ön Koşullar
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

### Çalıştırma
1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/evrimcolakoglu/blog-task.git
   cd blog-task
   ```
2. **Sistemi başlatın:**
   ```bash
   docker compose up -d --build
   ```
3. **Uygulamaya erişin:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8080/api/posts

---

## 📡 API Uç Noktaları

Uygulama, frontend ve backend arasındaki bağlantıyı Next.js API Routes üzerinden sağlayarak ağ karmaşasını ve CORS sorunlarını ortadan kaldırır.

| İşlem | Method | Endpoint (Proxy) | Yetki |
|-------|--------|------------------|-------|
| Yazıları Listele | GET | `/api/posts` | Herkese Açık |
| Yazı Detayı | GET | `/api/posts/{id}` | Herkese Açık |
| Yeni Yazı Ekle | POST | `/api/posts` | Herkese Açık |
| Yazıyı Güncelle | PUT | `/api/posts/{id}` | Herkese Açık |
| Yazıyı Sil | DELETE | `/api/posts/{id}` | Herkese Açık |

---

## ⚙️ CI/CD (GitHub Actions)

Projede kod kalitesini ve derleme başarısını ölçmek için GitHub Actions kullanılmaktadır:
- **Backend CI:** Her push işleminde JDK 17 ile Maven derlemesi ve testler koşulur.
- **Frontend CI:** Her push işleminde bağımlılıklar kontrol edilir ve Lint süreçlerinden geçerek `build` testi yapılır.

---

## 🌿 Git Branch Stratejisi
- `main`: Kararlı ve yayına hazır ana sürüm.
- `develop`: Aktif geliştirme dalı.

---

## 📝 Lisans
Bu proje staj değerlendirme ve yetkinlik sunumu amacıyla hazırlanmıştır.
