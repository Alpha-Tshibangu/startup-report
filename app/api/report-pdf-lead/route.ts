import { NextResponse } from "next/server";

import {
  createReportPdfAirtableRecord,
  getAirtableTableForEdition,
  isAirtableConfigured,
  sendReportPdfLeadNotification,
} from "@/app/lib/report-pdf-lead-server";
import type { ReportEdition } from "@/app/lib/report-pdfs";

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isEdition(value: unknown): value is ReportEdition {
  return value === "latest" || value === "past";
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

  const { edition, fullName, company, email } = body as Record<string, unknown>;

  if (!isEdition(edition)) {
    return jsonError("Invalid or missing edition", 400);
  }

  if (typeof fullName !== "string" || !fullName.trim()) {
    return jsonError("Full name is required", 400);
  }
  if (typeof company !== "string" || !company.trim()) {
    return jsonError("Company is required", 400);
  }
  if (typeof email !== "string" || !email.trim()) {
    return jsonError("Email is required", 400);
  }

  const trimmed = {
    fullName: fullName.trim(),
    company: company.trim(),
    email: email.trim(),
  };

  if (!isAirtableConfigured()) {
    return jsonError("Server is not configured for lead capture", 503);
  }

  const airtableTableName = getAirtableTableForEdition(edition);

  try {
    await createReportPdfAirtableRecord({ ...trimmed, edition });
  } catch (err) {
    console.error("Airtable create failed:", err);
    return jsonError("Could not save your submission. Please try again.", 502);
  }

  try {
    await sendReportPdfLeadNotification({
      ...trimmed,
      edition,
      airtableTableName,
    });
  } catch (err) {
    console.error("Resend notification failed (Airtable record was created):", err);
  }

  return NextResponse.json({ ok: true });
}
