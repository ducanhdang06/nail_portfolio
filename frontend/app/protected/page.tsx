import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import HeroSection from "@/components/hero";
import Services from "@/components/services";
import AboutSection from "@/components/about";
import PortfolioSection from "@/components/portfolio";
import BookingSection from "@/components/booking";
import ReviewWrapper from "@/components/review-wrapper";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: services, error } = await supabase.from("services").select("*");

  if (!user) {
    //return 
    redirect("/sign-in");
  }

  return (
    <div className="overflow-hidden">
      <HeroSection bookLink="#booking" />
      <AboutSection />
      <Services services={services ?? []} />
      <PortfolioSection />
      <ReviewWrapper />
    </div>
  );
}
