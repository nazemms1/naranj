"use client";

import * as React from "react";
import { Check, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ornament } from "@/components/shared/ornament";
import { restaurant } from "@/content/restaurant";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { waHref } from "@/lib/utils";

/**
 * Event enquiries are low volume and always end in a conversation, so this
 * form composes the details into a WhatsApp message rather than pretending to
 * be a booking pipeline. Nothing is silently dropped.
 */
export function EventRequestForm({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [type, setType] = React.useState("wedding");

  const typeLabels: Record<string, string> = {
    wedding: t.events.eventTypes.wedding,
    birthday: t.events.eventTypes.birthday,
    business: t.events.eventTypes.business,
    delegation: t.events.eventTypes.delegation,
    family: t.events.eventTypes.family,
    other: t.events.eventTypes.other,
  };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);

    const data = new FormData(event.currentTarget);
    const lines =
      locale === "ar"
        ? [
            "طلب عرض لمناسبة في نارنج",
            `النوع: ${typeLabels[type]}`,
            `الاسم: ${data.get("name")}`,
            `الهاتف: ${data.get("phone")}`,
            `التاريخ المقترح: ${data.get("date")}`,
            `عدد الضيوف: ${data.get("guests")}`,
            `تفاصيل: ${data.get("details") || "—"}`,
          ]
        : [
            "Event proposal request for Naranj",
            `Type: ${typeLabels[type]}`,
            `Name: ${data.get("name")}`,
            `Phone: ${data.get("phone")}`,
            `Preferred date: ${data.get("date")}`,
            `Guests: ${data.get("guests")}`,
            `Details: ${data.get("details") || "—"}`,
          ];

    window.open(waHref(restaurant.whatsapp, lines.join("\n")), "_blank", "noopener");
    setSending(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-brass-500/30 bg-ink-850/70 p-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full border border-brass-400/50 bg-brass-500/10 text-brass-300">
          <Check className="size-6" />
        </span>
        <h3 className="mt-6 text-2xl text-ivory-100">
          {t.reservation.successTitle}
        </h3>
        <Ornament className="my-6" />
        <p className="text-[0.94rem] leading-relaxed text-stone-400">
          {t.events.formLede}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-7"
          onClick={() => setSent(false)}
        >
          {t.reservation.newBooking}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6 rounded-2xl border border-brass-500/20 bg-ink-850/70 p-7 sm:p-10"
    >
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="event-type">{t.events.eventType}</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="event-type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(typeLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="event-name">{t.reservation.name}</Label>
          <Input id="event-name" name="name" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="event-phone">{t.reservation.phone}</Label>
          <Input
            id="event-phone"
            name="phone"
            type="tel"
            dir="ltr"
            required
            autoComplete="tel"
            placeholder="+963 9xx xxx xxx"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="event-date">{t.reservation.date}</Label>
          <Input
            id="event-date"
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="event-guests">{t.reservation.guests}</Label>
          <Input
            id="event-guests"
            name="guests"
            type="number"
            min={8}
            max={250}
            defaultValue={30}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="event-details" hint={t.common.optional}>
          {t.reservation.notes}
        </Label>
        <Textarea id="event-details" name="details" />
      </div>

      <Button type="submit" size="md" className="self-start" disabled={sending}>
        {sending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4 flip-rtl" />
        )}
        {t.events.submit}
      </Button>
    </form>
  );
}
