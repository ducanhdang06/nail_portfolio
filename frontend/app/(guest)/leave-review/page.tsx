import { createClient } from '@/utils/supabase/server';
import ReviewSection from '@/components/ReviewSection';

export default async function LeaveReviewPage() {
  const supabase = await createClient();
  const { data: services, error } = await supabase.from('services').select('name');

  if (error) {
    return <div className="text-center text-red-500 py-12">Failed to load services: {error.message}</div>;
  }
  if (!services) {
    return <div className="text-center text-muted-foreground py-12">Loading services...</div>;
  }

  // Map to string[]
  const serviceNames = services.map((s: any) => s.name);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ReviewSection services={serviceNames} />
    </main>
  );
}
