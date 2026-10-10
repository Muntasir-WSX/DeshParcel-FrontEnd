import Link from "next/link";
import Logo from "@/components/logo/logo";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#070b19] text-white overflow-hidden flex flex-col">
     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "আপনার_গুগল_ক্লাইয়েন্ট_আইডি_এখানে_দিন"}>
  {children}
</GoogleOAuthProvider>
    </div>
  );
}