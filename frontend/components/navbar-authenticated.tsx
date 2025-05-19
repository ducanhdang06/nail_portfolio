'use client'
import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function NavbarAuthenticated({ user }: { user: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-center h-16 backdrop-blur-sm bg-white/70 sticky top-0 z-50 shadow-pastel">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5">
          <div className="flex-1 flex items-center">
            <Link href="/protected" className="text-xl font-semibold text-blush">
              <span className="font-accent">Nails</span> by Sophie
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/protected/"
              className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
            >
              Home
            </Link>
            <Link
              href="/protected/about-me"
              className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
            >
              About
            </Link>
            <Link
              href="/protected/services"
              className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
            >
              Services
            </Link>
            <Link
              href="/protected/booking"
              className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
            >
              Book Now
            </Link>
            <Link
              href="/protected/leave-review"
              className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
            >
              Leave a Review
            </Link>
            <Link
              href="/protected/profile"
              className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
            >
              Profile
            </Link>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="md:hidden flex items-center justify-center p-2 border-blush text-blush hover:bg-blush/10 menu-button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      {/* Mobile menu dropdown */}
      <div
        className={`fixed top-16 left-0 w-full z-50 transition-transform duration-200 md:hidden ${
          isMenuOpen
            ? 'translate-y-0 pointer-events-auto opacity-100'
            : '-translate-y-full pointer-events-none opacity-0'
        }`}
      >
        <div className="bg-white/95 rounded-b-3xl shadow-pastel mx-2 py-4 flex flex-col items-center space-y-2 border-t border-blush">
          <Link
            href="/protected/"
            className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/protected/about-me"
            className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/protected/services"
            className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/protected/booking"
            className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </Link>
          <Link
            href="/protected/leave-review"
            className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Leave a Review
          </Link>
          <Link
            href="/protected/profile"
            className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Profile
          </Link>
        </div>
      </div>
    </>
  );
}
