"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KeyRound, LogOut, User as UserIcon, Settings } from "lucide-react";

interface PublicUser {
  full_name: string;
}

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [authUser, setAuthUser] = useState<any>(null);
  const [publicUser, setPublicUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/sign-in");
        return;
      }
      setAuthUser(user);
      // Optionally fetch public user data (e.g., full_name)
      const { data } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", user.id)
        .single();
      setPublicUser(data as PublicUser);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-soft p-8 text-center">
          Loading profile...
        </div>
      </div>
    );
  }

  const fullName = publicUser?.full_name || authUser?.email || "Your Account";

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-soft p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-lilac/20 rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-peach/20 rounded-full"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Profile avatar */}
            <div className="w-24 h-24 bg-blush/20 rounded-full flex items-center justify-center">
              <UserIcon size={40} className="text-blush" />
            </div>
            {/* Profile info */}
            <div>
              <h1 className="text-2xl font-medium text-gray-800 mb-1">
                {fullName}
              </h1>
              <p className="text-gray-600">{authUser?.email}</p>
            </div>
          </div>
          <div className="mt-10 space-y-6">
            <h2 className="text-lg font-medium text-gray-700 flex items-center gap-2">
              <Settings size={18} className="text-gray-500" />
              Account Settings
            </h2>
            {/* Account options */}
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-lilac/10 to-transparent rounded-lg border border-lilac/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <KeyRound size={20} className="text-lilac" />
                    <div>
                      <h3 className="font-medium text-gray-700">Password</h3>
                      <p className="text-sm text-gray-500">
                        Change your password to keep your account secure
                      </p>
                    </div>
                  </div>
                  <Link href="/protected/profile/reset-password">
                    <Button
                      variant="outline"
                      className="border-lilac text-lilac hover:bg-lilac/10 hover:text-lilac"
                    >
                      Change Password
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-peach/10 to-transparent rounded-lg border border-peach/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <LogOut size={20} className="text-peach" />
                    <div>
                      <h3 className="font-medium text-gray-700">Sign Out</h3>
                      <p className="text-sm text-gray-500">
                        Sign out from your account on this device
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-peach text-peach hover:bg-peach/10 hover:text-peach"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push("/");
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
