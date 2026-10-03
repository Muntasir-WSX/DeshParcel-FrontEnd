import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";


export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-[#03132B] flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
}