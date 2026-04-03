// app/admin/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import SignOutButton from "@/components/ui/SignOutButton";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {}, // read-only in Server Component — mutations happen in middleware
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top bar */}
      <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-200">AWS Club Admin</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-500 hidden sm:block">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Logged in as <span className="text-zinc-400">{user.email}</span>
          </p>
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Members", value: "—", icon: "👥" },
            { label: "Events", value: "—", icon: "📅" },
            { label: "Registrations", value: "—", icon: "📝" },
            { label: "Active Projects", value: "—", icon: "🚀" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <div className="text-2xl font-semibold text-white mb-1">{card.value}</div>
              <div className="text-xs text-zinc-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Placeholder sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 bg-zinc-800 rounded w-3/4" />
                    <div className="h-2.5 bg-zinc-800/60 rounded w-1/2" />
                  </div>
                  <div className="h-2.5 bg-zinc-800/40 rounded w-14 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {["Manage Members", "Create Event", "View Registrations", "Edit Content"].map((action) => (
                <button
                  key={action}
                  className="w-full text-left px-4 py-2.5 text-sm text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
