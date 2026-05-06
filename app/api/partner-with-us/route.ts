import { NextResponse } from "next/server";

import {
  createPartnerAirtableRecord,
  getPartnerAirtableTableName,
  sendPartnerLeadNotification,
} from "@/app/lib/partner-lead-server";
import { isAirtableConfigured } from "@/app/lib/report-pdf-lead-server";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  if (!body || typeof body !== "object") {
    return jsonError("Invalid body", 400);
  }

  const { fullName, email, message } = body as Record<string, unknown>;

  if (typeof fullName !== "string" || !fullName.trim()) {
    return jsonError("Full name is required", 400);
  }
  if (typeof email !== "string" || !email.trim()) {
    return jsonError("Email is required", 400);
  }
  if (typeof message !== "string" || !message.trim()) {
    return jsonError("Message is required", 400);
  }

  const trimmed = {
    fullName: fullName.trim(),
    email: email.trim(),
    message: message.trim(),
  };

  if (!isAirtableConfigured()) {
    return jsonError("Server is not configured for lead capture", 503);
  }

  const airtableTableName = getPartnerAirtableTableName();

  try {
    await createPartnerAirtableRecord(trimmed);
  } catch (err) {
    console.error("Airtable create failed:", err);
    return jsonError("Could not save your submission. Please try again.", 502);
  }

  try {
    await sendPartnerLeadNotification({ ...trimmed, airtableTableName });
  } catch (err) {
    console.error("Resend notification failed (Airtable record was created):", err);
  }

  return NextResponse.json({ ok: true });
}
