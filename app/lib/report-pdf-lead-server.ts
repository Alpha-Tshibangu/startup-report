import "server-only";

import { Resend } from "resend";

import type { ReportEdition } from "./report-pdfs";

export const REPORT_PDF_FORM_NAME =
  "Startup Playbooks Report — PDF access";

/** Field names must match your Airtable tables (case-sensitive). */
const AIRTABLE_FIELDS = {
  fullName: "Full name",
  company: "Company",
  email: "Email",
} as const;

function editionDisplay(edition: ReportEdition): string {
  return edition === "latest" ? "Latest edition" : "Past editions";
}

export function getAirtableTableForEdition(edition: ReportEdition): string {
  const latest =
    process.env.AIRTABLE_TABLE_LATEST?.trim() ??
    "Latest edition submissions";
  const past =
    process.env.AIRTABLE_TABLE_PAST?.trim() ?? "Past editions submissions";
  return edition === "latest" ? latest : past;
}

export function isAirtableConfigured(): boolean {
  return Boolean(
    process.env.AIRTABLE_BASE_ID?.trim() &&
      process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.trim(),
  );
}

export async function createReportPdfAirtableRecord(input: {
  fullName: string;
  company: string;
  email: string;
  edition: ReportEdition;
}): Promise<void> {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.trim();
  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  const tableName = getAirtableTableForEdition(input.edition);

  if (!token || !baseId) {
    throw new Error("Missing Airtable configuration");
  }

  const path = `/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`;
  const res = await fetch(`https://api.airtable.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        [AIRTABLE_FIELDS.fullName]: input.fullName,
        [AIRTABLE_FIELDS.company]: input.company,
        [AIRTABLE_FIELDS.email]: input.email,
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Airtable error ${res.status}: ${detail}`);
  }
}

function notifyRecipient(): string {
  return (
    process.env.REPORT_PDF_NOTIFY_EMAIL?.trim() ??
    "vidit@curiositycentre.com"
  );
}

export async function sendReportPdfLeadNotification(input: {
  fullName: string;
  company: string;
  email: string;
  edition: ReportEdition;
  airtableTableName: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    throw new Error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
  }

  const resend = new Resend(apiKey);
  const edition = editionDisplay(input.edition);
  const baseId = process.env.AIRTABLE_BASE_ID?.trim() ?? "";

  const text = [
    `New submission: ${REPORT_PDF_FORM_NAME}`,
    "",
    `Edition: ${edition}`,
    "",
    "Submitter:",
    `  Name: ${input.fullName}`,
    `  Company: ${input.company}`,
    `  Email: ${input.email}`,
    "",
    baseId
      ? `The form responses were saved to Airtable (base ${baseId}) in table "${input.airtableTableName}".`
      : `The form responses were saved to Airtable in table "${input.airtableTableName}".`,
  ].join("\n");

  const baseLine = baseId
    ? `The form responses were saved to Airtable (base <code>${escapeHtml(
        baseId,
      )}</code>) in table <strong>${escapeHtml(input.airtableTableName)}</strong>.`
    : `The form responses were saved to Airtable in table <strong>${escapeHtml(
        input.airtableTableName,
      )}</strong>.`;

  const html = `
    <p><strong>New submission:</strong> ${REPORT_PDF_FORM_NAME}</p>
    <p><strong>Edition:</strong> ${edition}</p>
    <p><strong>Submitter</strong></p>
    <ul>
      <li>Name: ${escapeHtml(input.fullName)}</li>
      <li>Company: ${escapeHtml(input.company)}</li>
      <li>Email: ${escapeHtml(input.email)}</li>
    </ul>
    <p>${baseLine}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [notifyRecipient()],
    subject: `PDF access form: ${edition} — ${input.fullName}`,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
