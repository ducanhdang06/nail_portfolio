// app/protected/layout.tsx
import "../globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavbarAuthenticated from "@/components/navbar-authenticated";
import { Quicksand, Poppins, Caveat } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quicksand",
});
const caveat = Caveat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
});
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${poppins.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-blush-light text-foreground font-sans">
        <main className="min-h-screen flex flex-col items-center bg-blush-light text-foreground font-sans">
          <div className="flex-1 w-full flex flex-col items-center">
            <NavbarAuthenticated user={user} />
            <div className="w-full">{children}</div>
          </div>
          <footer className="w-full bg-white py-8 px-4 md:px-8 mt-12 shadow-pastel">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-accent text-2xl mb-4 text-blush">
                  Nails by Sophie
                </h3>
                <p className="text-sm text-gray-600">
                  Creating beautiful nail art for every occasion.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <div className="flex flex-col space-y-2">
                  <a
                    href="/protected/"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    Home
                  </a>
                  <a
                    href="/protected/about-me"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="/protected/services"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    Services
                  </a>
                  <a
                    href="/protected/portfolio"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    Portfolio
                  </a>
                  <a
                    href="/protected/booking"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    Book Now
                  </a>
                  <a
                    href="/protected/leave-review"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    Leave a Review
                  </a>
                  <a
                    href="/protected/profile"
                    className="text-sm hover:text-blush transition-colors"
                  >
                    Profile
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-700">Contact</h4>
                <p className="text-sm text-gray-600">
                  314 S Twin Oaks Valley Rd, Unit 113, San Marcos, CA 92078
                </p>
                <p className="text-sm text-gray-600">nailsbysophie1110@gmail.com</p>
                <p className="text-sm text-gray-600">(760) 744-2289</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs">
              <p>
                © {new Date().getFullYear()} Nails by Sophie. All rights
                reserved.
              </p>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
