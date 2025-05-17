import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Quicksand, Poppins, Caveat } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "../globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sophie's Nail Studio",
  description: "Book appointments with Sarah for custom nail art and designs",
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
    <html lang="en" className={`${quicksand.variable} ${poppins.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="bg-blush-light text-foreground font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex justify-center h-16 backdrop-blur-sm bg-white/70 sticky top-0 z-50 shadow-pastel">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5">
                  <div className="flex items-center">
                    <Link href="/" className="text-xl font-semibold text-blush">
                      <span className="font-accent">Sophie's</span> Nail Studio
                    </Link>
                  </div>
                  <div className="hidden md:flex space-x-6">
                    <Link href="/#home" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Home</Link>
                    <Link href="/#about" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">About</Link>
                    <Link href="/#services" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Services</Link>
                    <Link href="/#booking" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Book Now</Link>
                    <Link href="/sign-in" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Sign in</Link>
                    <Link href="/sign-up" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Sign up</Link>
                  </div>
                  <div className="md:hidden">
                    <button className="p-2 rounded-full bg-blush text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </nav>

              <div className="w-full">
                {children}
              </div>

              <footer className="w-full bg-white py-8 px-4 md:px-8 mt-12 shadow-pastel">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-accent text-2xl mb-4 text-blush">Sarah's Nail Studio</h3>
                    <p className="text-sm text-gray-600">Creating beautiful nail art for every occasion.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Quick Links</h4>
                    <div className="flex flex-col space-y-2">
                      <Link href="#home" className="text-sm hover:text-blush transition-colors">Home</Link>
                      <Link href="#about" className="text-sm hover:text-blush transition-colors">About</Link>
                      <Link href="#services" className="text-sm hover:text-blush transition-colors">Services</Link>
                      <Link href="#booking" className="text-sm hover:text-blush transition-colors">Book Now</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Contact</h4>
                    <p className="text-sm text-gray-600">123 Nail Street, Beauty City</p>
                    <p className="text-sm text-gray-600">email@example.com</p>
                    <p className="text-sm text-gray-600">(123) 456-7890</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100 text-center text-xs">
                  <p>© {new Date().getFullYear()} Sarah's Nail Studio. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}