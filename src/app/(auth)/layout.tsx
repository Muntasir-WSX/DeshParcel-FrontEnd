import Link from "next/link";
import Logo from "@/components/logo/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#070b19] text-white overflow-hidden flex flex-col">
      {children}
    </div>
  );
}