import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="flex min-h-dvh flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
