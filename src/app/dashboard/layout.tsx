import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/20 w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col p-6 space-y-6">
        <h2 className="font-heading font-extrabold text-xl text-[oklch(0.577_0.245_27.325)]">
          DeshParcel Panel
        </h2>
        <nav className="flex flex-col space-y-2 text-sm font-semibold text-muted-foreground">
          <Link href="/dashboard/admin" className="hover:text-foreground transition-colors p-2 rounded-xl hover:bg-muted">Admin Overview</Link>
          <Link href="/dashboard/moderator" className="hover:text-foreground transition-colors p-2 rounded-xl hover:bg-muted">Moderator Hub</Link>
          <Link href="/dashboard/rider" className="hover:text-foreground transition-colors p-2 rounded-xl hover:bg-muted">Rider Deliveries</Link>
          <Link href="/dashboard/user" className="hover:text-foreground transition-colors p-2 rounded-xl hover:bg-muted">User Parcels</Link>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 md:px-8">
          <h2 className="font-heading font-bold text-lg text-foreground">Dashboard Management System </h2>
          <Link href="/" className="text-xs font-bold uppercase tracking-wider text-[oklch(0.577_0.245_27.325)] hover:underline">
            Back to Home
          </Link>
        </header>

        <main className=" bg-[#03132B] flex-1 w-full p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}