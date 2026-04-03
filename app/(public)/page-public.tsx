// app/(public)/page.tsx
// Add <AdminTrigger /> anywhere inside your existing JSX — it renders null.
// Example (adapt to your real file):

import AdminTrigger from "@/components/ui/AdminTrigger";

export default function HomePage() {
  return (
    <>
      <AdminTrigger />

      {/* ── your existing homepage JSX unchanged below ── */}
      <main>
        {/* ... */}
      </main>
    </>
  );
}
