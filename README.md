# 🚀 Full-Stack Blog Uygulaması

Bu proje, modern yazılım mimarisi prensiplerini (Frontend, Backend, Database, CI/CD, DevOps) kapsayan uçtan uca bir blog uygulamasıdır.

## 🔗 Canlı Önizleme (Demo)
Proje DigitalOcean (Frankfurt) sunucuları üzerinde canlıya alınmıştır:
👉 [http://138.197.187.123:3000](http://138.197.187.123:3000)

---

## ✨ Öne Çıkan Özellikler
- **Full-Stack Mimari:** Spring Boot (Backend) ve Next.js (Frontend) entegrasyonu.
- **Gelişmiş Arama:** Yazılar arasında başlık ve içerik bazlı dinamik arama özelliği.
- **Dockerize Yapı:** `docker-compose` ile tüm veritabanı ve servislerin tek komutla ayağa kaldırılması.
- **CI/CD Süreçleri:** GitHub Actions kullanılarak her commit sonrası otomatik derleme ve test süreçleri.
- **Responsive Tasarım:** Mobil ve masaüstü cihazlarla uyumlu modern arayüz.

## 🛠️ Kullanılan Teknolojiler
- **Backend:** Java 17, Spring Boot, Spring Data JPA, PostgreSQL, JUnit.
- **Frontend:** Next.js (App Router), Tailwind CSS, Axios.
- **DevOps/Deployment:** Docker, Docker Compose, GitHub Actions, DigitalOcean (Droplet).

---

## 📦 Yerel Kurulum (Local Setup)

Projeyi kendi bilgisayarınızda çalıştırmak için Docker yüklü olması yeterlidir:

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/evrimcolakoglu/blog-task
   cd blog-task
