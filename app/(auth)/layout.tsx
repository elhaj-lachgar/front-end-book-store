import RouteAuth from "@/components/RouteAuth";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <RouteAuth>{children}</RouteAuth>
    </main>
  );
}
