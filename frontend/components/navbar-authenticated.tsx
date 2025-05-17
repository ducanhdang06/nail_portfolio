import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export default function NavbarAuthenticated({ user }: { user: any }) {
  return (
    <nav className="w-full flex justify-center h-16 backdrop-blur-sm bg-white/70 sticky top-0 z-50 shadow-pastel">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5">
        <div className="flex items-center">
          <Link href="/protected" className="text-xl font-semibold text-blush">
            <span className="font-accent">Sophie's</span> Nail Studio
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/protected/#home"
            className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
          >
            Home
          </Link>
          <Link
            href="/protected/#about"
            className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
          >
            About
          </Link>
          <Link
            href="/protected/#services"
            className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
          >
            Services
          </Link>
          <Link
            href="/protected/#booking"
            className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
          >
            Book Now
          </Link>
          <Link
            href="/protected/profile"
            className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
          >
            Profile
          </Link>
          <Link
            href="/protected/my-appointment"
            className="text-gray-700 font-medium hover:text-blush hover:underline transition-colors"
          >
            My Appointment
          </Link>
        </div>
        <div className="md:hidden">
          <button className="p-2 rounded-full bg-blush text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
