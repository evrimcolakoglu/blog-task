# DevBlog - Modern Paylaşım Platformu

DevBlog, kullanıcıların özgürce fikirlerini paylaşabileceği modern, hızlı ve duyarlı bir blog platformudur. Bu proje, staj değerlendirme süreci kapsamında tam yığın (full-stack) geliştirme becerilerini sergilemek amacıyla hazırlanmıştır.

## 🚀 Canlı Demo
Uygulamanın çalışan haline şu adresten ulaşabilirsiniz:  
**[Canlı Sistem (Production) - http://138.197.187.123:3000](http://138.197.187.123:3000)**

---

## 🛠️ Teknoloji Yığını (Tech Stack)

### Backend (Sunucu)
- **Framework:** Spring Boot (Java 17)
- **Veritabanı:** PostgreSQL 15
- **Mimari:** Katmanlı Mimari (Controller, Service, Repository)
- **API Yapısı:** RESTful API

### Frontend (İstemci)
- **Framework:** Next.js (React 18)
- **Stil/Tasarım:** Tailwind CSS
- **Veri Çekme:** Fetch API (Client & Server Components)
- **Yönlendirme:** Next.js App Router

### DevOps & CI/CD
- **Konteynerleştirme:** Docker & Docker Compose
- **Sürekli Entegrasyon (CI):** GitHub Actions
- **Dağıtım (Deployment):** DigitalOcean (Ubuntu VPS)

---

## 📋 Proje Kurulumu (Yerel Ortam)

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz. Proje `Docker Compose` ile tek tıkla ayağa kalkacak şekilde yapılandırılmıştır.

### Ön Koşullar
Sisteminizde aşağıdakilerin kurulu olduğundan emin olun:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### Adım Adım Kurulum

1. **Projeyi Klonlayın:**
   ```bash
   git clone <repo-url>
   cd blog-task
   ```

2. **Çevre Değişkenlerini (Environment Variables) Ayarlayın:**
   Projenin kök dizininde bulunan örnek env dosyasını kopyalayarak kendi gizli `.env` dosyanızı oluşturun:
   ```bash
   cp .env.example .env
   ```
   *Not: `.env` dosyasındaki şifre alanlarını yerel geliştirme için dilediğiniz gibi güncelleyebilirsiniz.*

3. **Docker Compose ile Projeyi Ayağa Kaldırın:**
   Aşağıdaki komutu çalıştırarak veritabanı, backend ve frontend konteynerlerini oluşturun ve başlatın:
   ```bash
   docker-compose up --build -d
   ```

4. **Uygulamaya Erişin:**
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8080/api/posts

---

## ⚙️ CI/CD Süreçleri (GitHub Actions)

Projede kod kalitesini artırmak ve hatalı sürümlerin ana dallara eklenmesini önlemek amacıyla **GitHub Actions** ile otomatik bir CI (Sürekli Entegrasyon) süreci kurulmuştur.

- **Tetikleyici (Trigger):** `main` veya `develop` dallarına yapılan her Push (itme) veya Pull Request (çekme isteği) işleminde çalışır.
- **İşlem Adımları:** 
  1. Kod deposu (checkout) indirilir.
  2. JDK 17 kurulumu yapılır ve Maven önbelleği (cache) ayarlanır.
  3. Güvenlik için `./mvnw` dosyasına çalışma izni verilir (`chmod +x ./mvnw`).
  4. Spring Boot projesi testler atlanarak `mvn clean package` komutuyla derlenir.
- **Amaç:** Backend uygulamasının herhangi bir kod değişikliğinden sonra başarılı bir şekilde derlenip derlenmediği otomatik olarak kontrol edilir. Başarısız derlemeler repoya yansımadan tespit edilir.

## 🌿 Dal (Branch) Stratejisi
- `main`: Sadece kararlı ve çalışan, yayına (production) hazır sürümleri barındırır.
- `develop`: Geliştirme ortamıdır. Yeni özellikler buraya eklenir.

*Not: Eğer sunucu tarafında en güncel değişiklikleri (örneğin layout güncellemeleri) göremiyorsanız, sunucudaki yerel Git deposunun `develop` dalı yerine `main` dalında kalıp kalmadığını kontrol ediniz.*