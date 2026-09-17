import { z } from "zod";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export const SEATING_AREAS = ["courtyard", "hall", "terrace"] as const;
export const OCCASIONS = [
  "none",
  "birthday",
  "business",
  "family",
  "wedding",
] as const;

/**
 * The validation messages come from the active dictionary, so the same schema
 * serves both languages. The server re-validates with the Arabic dictionary —
 * it only needs the shape to hold, not the wording.
 */
export function reservationSchema(t: Dictionary) {
  return z.object({
    date: z
      .string()
      .min(1, t.reservation.validation.dateRequired)
      .refine((value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) >= today;
      }, t.reservation.validation.datePast),
    time: z.string().min(1, t.reservation.validation.timeRequired),
    guests: z.number().int().min(1).max(40),
    area: z.enum(SEATING_AREAS),
    occasion: z.enum(OCCASIONS),
    name: z.string().trim().min(2, t.reservation.validation.nameShort),
    phone: z
      .string()
      .trim()
      // Syrian and international formats both land here, so the rule stays
      // loose: 8+ digits, optional leading + and any separators.
      .regex(/^\+?[\d\s()-]{8,20}$/, t.reservation.validation.phoneInvalid),
    email: z
      .string()
      .trim()
      .email(t.reservation.validation.emailInvalid)
      .or(z.literal("")),
    notes: z.string().trim().max(600).optional(),
  });
}

export type ReservationInput = z.infer<ReturnType<typeof reservationSchema>>;

/** Service runs 10:00–01:00; slots are offered on the half hour. */
export function serviceTimes() {
  const slots: string[] = [];
  for (let hour = 10; hour <= 23; hour += 1) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    slots.push(`${String(hour).padStart(2, "0")}:30`);
  }
  slots.push("00:00", "00:30");
  return slots;
}

/** A short human-readable reference the guest can quote on the phone. */
export function makeReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const noise = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `NRJ-${stamp}${noise}`;
}
