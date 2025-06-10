import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { UserProvider } from '@/contexts/UserContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication | Job Tracker",
  description: "Login or signup to access your job tracking dashboard",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary transition-colors duration-300">
          <main className="min-h-screen">
            {children}
          </main>
          <ThemeToggle />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
} 