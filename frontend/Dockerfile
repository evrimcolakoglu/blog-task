# Node.js'in hafif bir sürümünü kullanıyoruz
FROM node:20-alpine

# Çalışma dizinini ayarlıyoruz
WORKDIR /app

# Bağımlılıkları kopyalayıp yüklüyoruz
COPY package*.json ./
RUN npm install

# Tüm kodları kopyalayıp projeyi build ediyoruz (inşa ediyoruz)
COPY . .
RUN npm run build

# Next.js'in çalışacağı portu açıyoruz
EXPOSE 3000

# Uygulamayı başlatıyoruz
CMD ["npm", "start"]