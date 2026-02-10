import { Sidebar } from "@/modules/core/Sidebar";
import { Header } from "@/modules/core/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block h-screen w-64 sticky top-0">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
