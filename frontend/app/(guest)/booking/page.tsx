import BookingSection from '@/components/BookingSection';
import { createClient } from '@/utils/supabase/server';

export default async function BookingPage() {
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
            <BookingSection services={serviceNames} />
        </main>
    )
}