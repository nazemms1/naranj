"use client";

import * as React from "react";
import { Check, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function NewsletterForm({ t }: { t: Dictionary }) {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);

  // No mailing provider is wired yet — swap this handler for the real
  // subscribe endpoint (Mailchimp, Resend audience, etc.) when one is chosen.
  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
    setEmail("");
  }

  if (done) {
    return (
      <p className="flex items-center gap-2.5 text-[0.9rem] text-brass-200">
        <Check className="size-4" />
        {t.newsletter.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.newsletter.placeholder}
          aria-label={t.newsletter.placeholder}
          className="h-11"
        />
        <Button type="submit" size="icon" aria-label={t.newsletter.submit}>
          <Send className="size-4 flip-rtl" />
        </Button>
      </div>
      <p className="text-[0.74rem] text-stone-600">{t.newsletter.privacy}</p>
    </form>
  );
}
