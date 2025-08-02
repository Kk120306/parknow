# 🚗 ParkNow – Peer-to-Peer Parking Marketplace

ParkNow is a full-stack web application that connects people with spare parking spaces to those who need them. Designed to alleviate urban parking challenges, the app allows users to list, discover, and book parking spaces easily and securely.

## ✨ Features

- 🔐 **Authentication** with Google/GitHub using `NextAuth.js`
- 🗺️ **Interactive Map Integration** for locating parking spots
- 📸 **Image Uploads** powered by Cloudinary
- ⚡ **Instant Booking** and availability management
- 🔎 **Advanced Filtering** by price, time, and location
- 🧠 **Clean Architecture** using modular actions, hooks, and libs
- 🧩 **Type Safety** with TypeScript
- 📦 **Flexible Database Modeling** using MongoDB & Prisma

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | Next.js (API Routes), Prisma ORM |
| **Auth** | NextAuth.js with Google/GitHub OAuth |
| **Database** | MongoDB |
| **Image Hosting** | Cloudinary |
| **Styling** | Tailwind CSS |
| **Deployment** | Vercel (Recommended) |

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Kk120306/parknow.git
cd parknow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following:

```env
DATABASE_URL=your_mongodb_connection_string
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application running.