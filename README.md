# SocialDev – Social Development Events Platform

SocialDev is a full-stack event management platform where users can discover upcoming social development events, create and manage their own events, and join events organized by others.

## 🌐 Live Demo

[Visit SocialDev](https://social-development-client.vercel.app/)

## 📂 Repositories

- **Frontend:** [SocialDev Client](https://github.com/nabin-90/social-development-client)
- **Backend:** [SocialDev Server](https://github.com/nabin-90/social-development-server)

## ✨ Features

- User registration and login with Better Auth.
- Browse upcoming social development events.
- View detailed information about each event.
- Create new events.
- Edit and delete events created by the logged-in user.
- Join events created by other users.
- Prevent duplicate event joining.
- View events joined by the logged-in user.
- Protected dashboard routes and authenticated API requests.
- Responsive user interface.

## 🛠️ Technologies Used

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth

**Backend**
- Node.js
- Express.js
- MongoDB
- Better Auth JWT
- CORS

**Deployment**
- Vercel

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/nabin-90/social-development-client.git
```

### 2. Navigate to the project directory

```bash
cd social-development-client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the required environment variables:

```env
NEXT_PUBLIC_SERVER_BASE_URL=YOUR_BACKEND_URL
```

Use your actual backend URL and configure the remaining authentication-related variables according to your project setup.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

The frontend is deployed on Vercel.

**Live URL:** https://social-development-client.vercel.app/

## 👨‍💻 Developer

**Mahmudun Nabin**

- GitHub: [nabin-90](https://github.com/nabin-90)

---

Built with ❤️ using Next.js and Tailwind CSS.
