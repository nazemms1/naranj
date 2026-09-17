"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Loader2,
  Phone,
  Users,
} from "lucide-react";

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
import { diningSpaces } from "@/content/spaces";
import { restaurant } from "@/content/restaurant";
import {
  makeReference,
  reservationSchema,
  serviceTimes,
  type ReservationInput,
} from "@/lib/reservation-schema";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import { cn, telHref, waHref } from "@/lib/utils";

const STEPS = ["when", "where", "who"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

export function ReservationForm({
  locale,
  t,
}: {
  locale: Locale;
  t: Dictionary;
}) {
  const searchParams = useSearchParams();
  const presetArea = searchParams?.get("area");

  const [step, setStep] = React.useState(0);
  const [reference, setReference] = React.useState<string | null>(null);
  const [failed, setFailed] = React.useState(false);

  const form = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema(t)),
    mode: "onTouched",
    defaultValues: {
      date: "",
      time: "20:00",
      guests: 2,
      area:
        presetArea === "hall" || presetArea === "terrace" ? presetArea : "courtyard",
      occasion: "none",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const values = form.watch();

  /** Validates only the fields on the current step before advancing. */
  async function next() {
    const fields: Record<number, (keyof ReservationInput)[]> = {
      0: ["date", "time", "guests"],
      1: ["area", "occasion"],
    };
    const valid = await form.trigger(fields[step] ?? []);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function onSubmit(data: ReservationInput) {
    setFailed(false);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!response.ok) throw new Error("request failed");
      const payload = (await response.json()) as { reference?: string };
      setReference(payload.reference ?? makeReference());
    } catch {
      setFailed(true);
    }
  }

  if (reference) {
    return (
      <Confirmation
        locale={locale}
        t={t}
        reference={reference}
        values={values}
        onReset={() => {
          form.reset();
          setStep(0);
          setReference(null);
        }}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Stepper step={step} t={t} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 rounded-2xl border border-brass-500/20 bg-ink-850/70 p-7 sm:p-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col gap-6"
          >
            {step === 0 && <StepWhen form={form} t={t} />}
            {step === 1 && <StepWhere form={form} t={t} locale={locale} />}
            {step === 2 && <StepWho form={form} t={t} />}
          </motion.div>
        </AnimatePresence>

        {failed && (
          <div className="mt-7 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/8 p-4">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
            <div className="flex flex-col gap-1">
              <p className="text-[0.9rem] text-red-200">{t.reservation.errorTitle}</p>
              <p className="text-[0.84rem] text-stone-500">{t.reservation.errorBody}</p>
            </div>
          </div>
        )}

        <div className="mt-9 flex items-center justify-between gap-4 border-t border-brass-500/15 pt-7">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className={cn(step === 0 && "invisible")}
          >
            <ArrowLeft className="size-4 flip-rtl" />
            {t.reservation.prev}
          </Button>

          {step < STEPS.length - 1 ? (
            <Button type="button" size="md" onClick={next}>
              {t.reservation.next}
              <ArrowRight className="size-4 flip-rtl" />
            </Button>
          ) : (
            <Button type="submit" size="md" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.reservation.submitting}
                </>
              ) : (
                <>
                  <Check className="size-4" />
                  {t.reservation.submit}
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.86rem] text-stone-500">
        <span>{t.reservation.preferCall}</span>
        <a
          href={telHref(restaurant.phones[0])}
          dir="ltr"
          className="inline-flex items-center gap-2 text-brass-300 transition-colors hover:text-brass-100"
        >
          <Phone className="size-3.5" />
          {restaurant.phones[0]}
        </a>
      </div>
    </div>
  );
}

/* --------------------------------- Steps ---------------------------------- */

type FormApi = UseFormReturn<ReservationInput>;

function StepWhen({ form, t }: { form: FormApi; t: Dictionary }) {
  const today = new Date().toISOString().split("T")[0];
  const times = serviceTimes();

  return (
    <>
      <Field label={t.reservation.date} error={form.formState.errors.date?.message}>
        <div className="relative">
          <Calendar className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-brass-600" />
          <Input type="date" min={today} {...form.register("date")} className="pe-11" />
        </div>
      </Field>

      <Field label={t.reservation.time} error={form.formState.errors.time?.message}>
        <Controller
          control={form.control}
          name="time"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <span className="flex items-center gap-2.5">
                  <Clock className="size-4 text-brass-600" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <Field label={t.reservation.guests} error={form.formState.errors.guests?.message}>
        <Controller
          control={form.control}
          name="guests"
          render={({ field }) => (
            <Select
              value={String(field.value)}
              onValueChange={(value) => field.onChange(Number(value))}
            >
              <SelectTrigger>
                <span className="flex items-center gap-2.5">
                  <Users className="size-4 text-brass-600" />
                  <SelectValue />
                </span>
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((count) => (
                  <SelectItem key={count} value={String(count)}>
                    {count} {t.reservation.guestsUnit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </Field>
    </>
  );
}

function StepWhere({
  form,
  t,
  locale,
}: {
  form: FormApi;
  t: Dictionary;
  locale: Locale;
}) {
  const selected = form.watch("area");

  return (
    <>
      <Field label={t.reservation.area}>
        <div className="flex flex-col gap-3">
          {diningSpaces.map((space) => (
            <button
              key={space.id}
              type="button"
              onClick={() => form.setValue("area", space.id)}
              aria-pressed={selected === space.id}
              className={cn(
                "flex flex-col gap-1.5 rounded-xl border p-5 text-start transition-all duration-500",
                "[transition-timing-function:var(--ease-luxe)]",
                selected === space.id
                  ? "border-brass-400/60 bg-brass-500/10"
                  : "border-brass-500/18 hover:border-brass-500/40 hover:bg-brass-500/5",
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="text-lg text-ivory-100">{space.name[locale]}</span>
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                    selected === space.id
                      ? "border-brass-400 bg-brass-400 text-ink-900"
                      : "border-brass-500/40",
                  )}
                >
                  {selected === space.id && <Check className="size-3" />}
                </span>
              </span>
              <span className="text-[0.86rem] leading-relaxed text-stone-500">
                {space.description[locale].split(".")[0]}.
              </span>
              <span className="mt-1 text-[0.78rem] text-brass-600">
                {t.spaces.capacity}: {space.capacity.min}–{space.capacity.max}{" "}
                {t.spaces.guests}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field label={t.reservation.occasion} hint={t.common.optional}>
        <Controller
          control={form.control}
          name="occasion"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">{t.reservation.occasionNone}</SelectItem>
                <SelectItem value="birthday">{t.events.eventTypes.birthday}</SelectItem>
                <SelectItem value="wedding">{t.events.eventTypes.wedding}</SelectItem>
                <SelectItem value="business">{t.events.eventTypes.business}</SelectItem>
                <SelectItem value="family">{t.events.eventTypes.family}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>
    </>
  );
}

function StepWho({ form, t }: { form: FormApi; t: Dictionary }) {
  return (
    <>
      <Field label={t.reservation.name} error={form.formState.errors.name?.message}>
        <Input autoComplete="name" {...form.register("name")} />
      </Field>

      <Field label={t.reservation.phone} error={form.formState.errors.phone?.message}>
        <Input
          type="tel"
          dir="ltr"
          autoComplete="tel"
          placeholder="+963 9xx xxx xxx"
          {...form.register("phone")}
        />
      </Field>

      <Field
        label={t.reservation.email}
        hint={t.common.optional}
        error={form.formState.errors.email?.message}
      >
        <Input type="email" dir="ltr" autoComplete="email" {...form.register("email")} />
      </Field>

      <Field label={t.reservation.notes} hint={t.common.optional}>
        <Textarea
          placeholder={t.reservation.notesPlaceholder}
          {...form.register("notes")}
        />
      </Field>
    </>
  );
}

/* ------------------------------ Presentation ------------------------------ */

function Stepper({ step, t }: { step: number; t: Dictionary }) {
  const labels = [
    t.reservation.steps.when,
    t.reservation.steps.where,
    t.reservation.steps.who,
  ];

  return (
    <ol className="flex items-center gap-2">
      {labels.map((label, index) => (
        <li key={label} className="flex flex-1 flex-col gap-2.5">
          <span
            className={cn(
              "h-px w-full transition-colors duration-700",
              index <= step ? "bg-brass-400" : "bg-brass-500/20",
            )}
          />
          <span
            className={cn(
              "text-[0.76rem] transition-colors duration-500",
              index <= step ? "text-brass-300" : "text-stone-600",
            )}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label hint={hint}>{label}</Label>
      {children}
      {error && <p className="text-[0.8rem] text-red-300">{error}</p>}
    </div>
  );
}

function Confirmation({
  locale,
  t,
  reference,
  values,
  onReset,
}: {
  locale: Locale;
  t: Dictionary;
  reference: string;
  values: ReservationInput;
  onReset: () => void;
}) {
  const space = diningSpaces.find((item) => item.id === values.area);
  const message =
    locale === "ar"
      ? `مرحباً، حجزت طاولة في نارنج. رقم الطلب ${reference} بتاريخ ${values.date} الساعة ${values.time} لـ ${values.guests} ضيف.`
      : `Hello, I booked a table at Naranj. Reference ${reference} on ${values.date} at ${values.time} for ${values.guests} guests.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mx-auto w-full max-w-2xl rounded-2xl border border-brass-500/30 bg-ink-850/80 p-9 text-center sm:p-12"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
        className="mx-auto grid size-16 place-items-center rounded-full border border-brass-400/50 bg-brass-500/10 text-brass-300"
      >
        <Check className="size-7" />
      </motion.span>

      <h2 className="mt-7 text-3xl text-ivory-100">{t.reservation.successTitle}</h2>
      <p className="mt-3 text-[0.96rem] leading-relaxed text-stone-400">
        {t.reservation.successBody}
      </p>

      <Ornament className="my-8" />

      <div className="flex flex-col gap-1.5">
        <span className="text-[0.72rem] uppercase tracking-luxe text-brass-500 rtl:text-[0.84rem] rtl:normal-case">
          {t.reservation.reference}
        </span>
        <span
          dir="ltr"
          className="font-[family-name:var(--font-display)] text-3xl tracking-[0.12em] text-foil"
        >
          {reference}
        </span>
      </div>

      <dl className="mt-9 grid gap-px overflow-hidden rounded-xl border border-brass-500/15 bg-brass-500/10 text-start sm:grid-cols-2">
        <SummaryRow label={t.reservation.date} value={values.date} />
        <SummaryRow label={t.reservation.time} value={values.time} />
        <SummaryRow
          label={t.reservation.guests}
          value={`${values.guests} ${t.reservation.guestsUnit}`}
        />
        <SummaryRow label={t.reservation.area} value={space?.name[locale] ?? ""} />
      </dl>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button asChild size="md">
          <a href={waHref(restaurant.whatsapp, message)} target="_blank" rel="noopener noreferrer">
            {t.common.whatsapp}
          </a>
        </Button>
        <Button variant="outline" size="md" onClick={onReset}>
          {t.reservation.newBooking}
        </Button>
      </div>
    </motion.div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-ink-900 px-5 py-4">
      <dt className="text-[0.8rem] text-stone-600">{label}</dt>
      <dd className="text-[0.92rem] text-ivory-200">{value}</dd>
    </div>
  );
}
