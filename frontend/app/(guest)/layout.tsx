import { Quicksand, Poppins, Caveat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "../globals.css";
import NavbarGuest from "@/components/navbar-guest";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nails by Sophie",
  description: "Book appointments with Sophie for custom nail art and designs",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${poppins.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-blush-light text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <NavbarGuest />

              <div className="w-full">{children}</div>

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
                    <h4 className="font-semibold mb-3 text-gray-700">
                      Quick Links
                    </h4>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/"
                        className="text-sm text-gray-700 font-medium hover:text-blush transition-colors"
                      >
                        Home
                      </Link>
                      <Link
                        href="/about-me"
                        className="text-sm text-gray-700 font-medium hover:text-blush transition-colors"
                      >
                        About
                      </Link>
                      <Link
                        href="/services"
                        className="text-sm text-gray-700 font-medium hover:text-blush transition-colors"
                      >
                        Services
                      </Link>
                      <Link
                        href="/portfolio"
                        className="text-sm text-gray-700 font-medium hover:text-blush transition-colors"
                      >
                        Portfolio
                      </Link>
                      <Link
                        href="/booking"
                        className="text-sm text-gray-700 font-medium hover:text-blush transition-colors"
                      >
                        Book Now
                      </Link>
                      <Link
                        href="/leave-review"
                        className="text-sm text-gray-700 font-medium hover:text-blush transition-colors"
                      >
                        Leave a Review
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-700">
                      Contact
                    </h4>
                    <p className="text-sm text-gray-600">
                      314 S Twin Oaks Valley Rd, Unit 113, San Marcos, CA 92078
                    </p>
                    <p className="text-sm text-gray-600">
                      nailsbysophie1110@gmail.com
                    </p>
                    <p className="text-sm text-gray-600">(760) 744-2289</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs">
                  <p>
                    © {new Date().getFullYear()} Nails by Sophie. All
                    rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
