import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Sidebar } from '@/components/layout/Sidebar';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications and optimize your CV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <UserProvider>
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary transition-colors duration-300">
              <Sidebar />
              <main className="ml-56 min-h-screen">
                {children}
              </main>
              <ThemeToggle />
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
