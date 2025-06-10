import { Sidebar } from '@/components/layout/Sidebar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#151A23]">
      <Sidebar />
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
      <ThemeToggle />
    </div>
  );
} 