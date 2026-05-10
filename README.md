# DevBlog - Modern Blog Platformu

DevBlog, kullanıcıların özgürce fikirlerini paylaşabileceği modern, hızlı ve duyarlı bir blog platformudur. Bu proje, staj değerlendirme süreci kapsamında tam yığın (full-stack) geliştirme becerilerini sergilemek amacıyla hazırlanmıştır. Uygulama, hızlı test edilebilirliği artırmak adına kimlik doğrulama zorunluluğu olmadan kullanılacak şekilde sadeleştirilmiştir.

## 🚀 Canlı Demo
Uygulamanın çalışan haline şu adresten ulaşabilirsiniz:  
**[http://138.197.187.123:3000](http://138.197.187.123:3000)**

---

## 🛠️ Teknoloji Yığını (Tech Stack)

| Katman | Teknoloji |
|--------|-----------|
| **Backend** | Spring Boot 3.2 (Java 17), Spring Security, JWT (JSON Web Token) |
| **Frontend** | Next.js 16 (React 19), Tailwind CSS 3 |
| **Veritabanı** | PostgreSQL 15 |
| **Konteyner** | Docker & Docker Compose |
| **CI/CD** | GitHub Actions |
| **Sunucu** | DigitalOcean (Ubuntu VPS) |

---

## 📋 Özellikler

- ✅ **CRUD İşlemleri:** Yazı ekleme, listeleme, okuma, düzenleme ve silme (Şifresiz Erişim)
- ✅ **Hızlı Paylaşım:** Giriş yapma zorunluluğu olmadan anında yazı oluşturma
- ✅ **Açık Yönetim:** Tüm kullanıcılar yazıları düzenleyebilir veya silebilir
- ✅ **Arama:** Başlık ve içerik üzerinden büyük/küçük harf duyarsız arama
- ✅ **Responsive Tasarım:** Mobil uyumlu, modern ve minimal arayüz
- ✅ **Docker Compose:** Tek komutla tüm sistemin ayağa kalkması
- ✅ **CI/CD:** GitHub Actions ile otomatik build kontrolü

---

## 🏗️ Mimari Yapı

```
blog-task/
├── backend/                  # Spring Boot (REST API + Security)
│   ├── src/main/java/com/blog/backend/
│   │   ├── controller/       # PostController, AuthController
│   │   ├── entity/           # Post, AppUser
│   │   ├── repository/       # PostRepository, UserRepository
│   │   ├── security/         # JwtUtil, JwtAuthFilter, SecurityConfig
│   │   └── service/          # PostService, CustomUserDetailsService
│   ├── Dockerfile
│   └── pom.xml
├── frontend/                 # Next.js (App Router)
│   ├── src/app/
│   │   ├── page.tsx          # Ana sayfa (yazı listesi + arama)
│   │   ├── layout.tsx        # Navbar + Footer
│   │   ├── login/            # Giriş sayfası
│   │   ├── register/         # Kayıt sayfası
│   │   ├── create/           # Yazı oluşturma
│   │   ├── edit/[id]/        # Yazı düzenleme
│   │   └── posts/[id]/       # Yazı detay + Düzenle/Sil butonları
│   └── Dockerfile
├── docker-compose.yml        # PostgreSQL + Backend + Frontend
├── .env.example              # Örnek çevre değişkenleri
├── .github/workflows/        # CI/CD yapılandırmaları
└── README.md
```

---

## 📦 Proje Kurulumu (Yerel Ortam)

### Ön Koşullar
- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### Adımlar

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/evrimcolakoglu/blog-task.git
   cd blog-task
   ```

2. **Çevre değişkenlerini ayarlayın:**
   ```bash
   cp .env.example .env
   # .env dosyasındaki kullanıcı adı ve şifre alanlarını güncelleyin
   ```

3. **Docker Compose ile başlatın:**
   ```bash
   docker compose up -d --build
   ```

4. **Uygulamaya erişin:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8080/api/posts

---

## 🔐 Kimlik Doğrulama (Authentication)

Uygulama **Spring Security + JWT** kullanarak token tabanlı kimlik doğrulama sağlar.

| Endpoint | Method | Açıklama | Yetki |
|----------|--------|----------|-------|
| `/api/auth/register` | POST | Yeni kullanıcı kaydı | Herkese açık |
| `/api/auth/login` | POST | Giriş yapma (JWT token döner) | Herkese açık |
| `/api/posts` | GET | Tüm yazıları listeleme | Herkese açık |
| `/api/posts/{id}` | GET | Tek yazı detayı | Herkese açık |
| `/api/posts` | POST | Yeni yazı oluşturma | Herkese açık |
| `/api/posts/{id}` | PUT | Yazı güncelleme | Herkese açık |
| `/api/posts/{id}` | DELETE | Yazı silme | Herkese açık |

---

## ⚙️ CI/CD (GitHub Actions)

Projede kod kalitesini artırmak için **GitHub Actions** ile otomatik CI süreci kurulmuştur.

- **Tetikleyici:** `main` veya `develop` dallarına yapılan her Push veya Pull Request
- **Backend CI:** JDK 17 kurulumu → Maven ile derleme ve test (`mvn clean package`)
- **Frontend CI:** Node.js 20 kurulumu → `npm install` → Lint kontrolü (`npm run lint`) → `npm run build`

---

## 🌿 Git Branch Stratejisi

| Dal | Amaç |
|-----|------|
| `main` | Kararlı, yayına (production) hazır sürümler |
| `develop` | Aktif geliştirme dalı; yeni özellikler buraya eklenir |

---

## 📝 Lisans
Bu proje staj değerlendirme amaçlıdır.