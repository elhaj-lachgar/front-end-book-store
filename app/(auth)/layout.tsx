import RouteAuth from "@/components/RouteAuth";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <RouteAuth>{children}</RouteAuth>
    </main>
  );
}
