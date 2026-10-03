import Link from "next/link";
import Logo from "@/components/logo/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="min-h-screen flex flex-col items-center bg-[#070b19] text-white px-4 py-8">
      {/* Top Logo Container */}
      <div className="mb-8 w-full max-w-7xl flex justify-center sm:justify-start px-4">
        <Logo />
      </div>
      
      {/* Main Content Container */}
      <div className="w-full max-w-7xl flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}