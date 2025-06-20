# 📌 Job Tracker Frontend

A modern React/Next.js frontend for the Job Tracker application, designed to provide an intuitive interface for managing job applications.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React Context API
- **Authentication**: JWT-based auth integration

## 📁 Project Structure

```
jobtracker-frontend/
├── app/           # Next.js app router pages
├── components/    # Reusable React components
├── contexts/      # React context providers
├── pages/         # Additional pages (if using pages router)
└── public/        # Static assets
```

## 🔧 Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🔗 Backend Integration

This frontend connects to the Job Tracker backend API. Make sure the backend server is running on `http://localhost:3001` before testing the frontend.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Made with ❤️ for job seekers everywhere
