import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import BookingSection from "@/components/booking";
import ReviewWrapper from "@/components/review-wrapper";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    //return
    redirect("/sign-in");
  }

  return (
    <div className="overflow-hidden">
      <HeroSection isSignedIn={true} userName={user.user_metadata.full_name} />
    </div>
  );
}
