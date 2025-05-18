import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function ForgotPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div>
      <h1 className="text-2xl font-medium mb-1 text-gray-800">
        Reset Password
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Remember your password?{" "}
        <Link
          className="text-blush font-medium hover:underline transition-colors"
          href="/sign-in"
        >
          Sign in
        </Link>
      </p>

      <form className="flex flex-col space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">
            Email
          </Label>
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

        <div className="pt-2">
          <SubmitButton
            formAction={forgotPasswordAction}
            className="w-full btn-primary"
          >
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>

      <SmtpMessage />
    </div>
  );
}
