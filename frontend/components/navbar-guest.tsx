'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavbarGuest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside or on navigation items
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
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
            <Link href="/sign-in" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Book Now</Link>
            <Link href="/sign-in" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Sign in</Link>
            <Link href="/sign-up" className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors">Sign up</Link>
          </div>
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
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      
      <div
        className={`fixed top-16 left-0 right-0 z-50 transition-all duration-200 md:hidden mobile-menu ${
          isMenuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 rounded-b-3xl shadow-pastel mx-2 py-4 flex flex-col items-center space-y-2 border-t border-blush">
          {[
            { href: '/#home', label: 'Home' },
            { href: '/#about', label: 'About' },
            { href: '/#services', label: 'Services' },
            // { href: '/sign-in', label: 'Book Now' },
            { href: '/sign-in', label: 'Sign in' },
            { href: '/sign-up', label: 'Sign up' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="w-full text-center py-2 text-lg font-medium text-gray-700 hover:text-blush hover:bg-blush/10 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}