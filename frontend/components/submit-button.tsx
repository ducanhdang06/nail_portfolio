"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      aria-disabled={pending} 
      className={`relative ${pending ? 'opacity-90' : ''} ${className || ''}`}
      disabled={pending}
      {...props}
    >
      {pending && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Loader2 size={16} className="animate-spin" />
        </span>
      )}
      {pending ? pendingText : children}
    </Button>
  );
}
