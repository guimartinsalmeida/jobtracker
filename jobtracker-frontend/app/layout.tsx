import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Tracker - Organize Your Job Applications",
  description: "A modern full-stack application to streamline and organize your job application process. Keep track of all your job applications in one secure, centralized platform.",
  keywords: ["job tracker", "job applications", "career management", "job search", "application tracking", "CV management"],
  authors: [{ name: "Guilherme Martins Almeida" }],
  creator: "Guilherme Martins Almeida",
  publisher: "Job Tracker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://jobtracker.vercel.app'),
  openGraph: {
    title: "Job Tracker - Organize Your Job Applications",
    description: "A modern full-stack application to streamline and organize your job application process.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Tracker - Organize Your Job Applications",
    description: "A modern full-stack application to streamline and organize your job application process.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#151A23]`}>
        <ThemeProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
