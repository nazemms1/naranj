import { NextResponse } from "next/server";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { makeReference, reservationSchema } from "@/lib/reservation-schema";

/**
 * Accepts a booking request, validates it, and hands back a reference.
 *
 * There is no booking system behind this yet. Requests are logged on the
 * server so nothing is lost, and the guest is told the restaurant will call to
 * confirm — which is how the house actually works today. When a real channel
 * is chosen (email via Resend, a Google Sheet, or a POS integration), send it
 * from the marked spot below; the client contract does not change.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = reservationSchema(getDictionary("ar")).safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const reference = makeReference();

  // --- Delivery point: replace with the real notification channel. ---
  console.info("[naranj] reservation request", {
    reference,
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ reference, status: "pending_confirmation" });
}

export async function GET() {
  return NextResponse.json({ error: "method_not_allowed" }, { status: 405 });
}
