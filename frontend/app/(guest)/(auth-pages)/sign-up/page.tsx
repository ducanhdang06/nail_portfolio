import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  if ("message" in searchParams) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-medium mb-1 text-gray-800">Create Account</h1>
      <p className="text-sm text-gray-500 mb-6">
        Already have an account?{" "}
        <Link className="text-blush font-medium hover:underline transition-colors" href="/sign-in">
          Sign in
        </Link>
      </p>
      
      <form className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-gray-700">Full Name</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <Input 
              name="full_name" 
              placeholder="John Doe" 
              required 
              className="pl-10 rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-400" />
            </div>
            <Input 
              name="phone" 
              placeholder="(123) 456-7890" 
              required 
              className="pl-10 rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-gray-400" />
            </div>
            <Input 
              name="email" 
              placeholder="you@example.com" 
              required 
              className="pl-10 rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700">Password</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock size={16} className="text-gray-400" />
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              minLength={6}
              required
              className="pl-10 rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30"
            />
          </div>
        </div>
        
        <div className="pt-2">
          <SubmitButton 
            formAction={signUpAction} 
            pendingText="Signing up..."
            className="w-full btn-primary"
          >
            Sign up
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      
      <SmtpMessage />
    </div>
  );
}
