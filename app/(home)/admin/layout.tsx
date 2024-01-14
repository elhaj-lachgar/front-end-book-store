import SideBar from "@/components/SideBar";
import AdminPrivate from "@/components/AdminPrivate";

export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return (
    <AdminPrivate>
      <main className="flex gap-x-8">
        <SideBar />
        <div className="relative w-full">{children}</div>
      </main>
    </AdminPrivate>
  );
}
