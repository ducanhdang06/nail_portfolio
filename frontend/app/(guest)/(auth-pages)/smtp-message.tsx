import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

export function SmtpMessage() {
  return (
    <div className="bg-lilac/10 px-5 py-4 border border-lilac/20 rounded-xl mt-6 flex gap-4 shadow-sm">
      <InfoIcon size={16} className="mt-0.5 text-lilac" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-gray-600">
          <strong>Note:</strong> Emails are rate limited. Enable Custom SMTP to
          increase the rate limit.
        </small>
        <div>
          <Link
            href="https://supabase.com/docs/guides/auth/auth-smtp"
            target="_blank"
            className="text-blush hover:text-blush/80 flex items-center text-sm gap-1 transition-colors"
          >
            Learn more <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
