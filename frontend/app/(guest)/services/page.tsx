// app/about/page.tsx
import Services from '@/components/ServicesSection';
import { createClient } from '@/utils/supabase/server';

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services, error } = await supabase.from("services").select("*");

  if (error) {
    console.error("Supabase services fetch error:", error);
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Services services={services ?? []} />
    </main>
  );
}