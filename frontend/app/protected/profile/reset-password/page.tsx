import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-pastel border border-blush p-8">
        <h1 className="text-2xl font-medium mb-1 text-gray-800 text-center">Reset Password</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please enter your new password below.
        </p>
        <form className="flex flex-col space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">New password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <Input
                type="password"
                name="password"
                placeholder="New password"
                required
                className="pl-10 rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-700">Confirm password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock size={16} className="text-gray-400" />
              </div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                className="pl-10 rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30"
              />
            </div>
          </div>
          <div className="pt-2">
            <SubmitButton formAction={resetPasswordAction} className="w-full btn-primary">
              Reset password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
