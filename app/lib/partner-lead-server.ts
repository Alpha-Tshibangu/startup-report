import "server-only";

import { Resend } from "resend";

export const PARTNER_FORM_NAME = "Partner with us";

const AIRTABLE_FIELDS = {
  fullName: "Full name",
  email: "Email",
  message: "Message",
} as const;

export function getPartnerAirtableTableName(): string {
  return (
    process.env.AIRTABLE_TABLE_PARTNER?.trim() ?? "Partner with us submissions"
  );
}

export async function createPartnerAirtableRecord(input: {
  fullName: string;
  email: string;
  message: string;
}): Promise<void> {
  const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN?.trim();
  const baseId = process.env.AIRTABLE_BASE_ID?.trim();
  const tableName = getPartnerAirtableTableName();

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
        [AIRTABLE_FIELDS.email]: input.email,
        [AIRTABLE_FIELDS.message]: input.message,
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
    process.env.REPORT_PDF_NOTIFY_EMAIL?.trim() ?? "vidit@curiositycentre.com"
  );
}

function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendPartnerLeadNotification(input: {
  fullName: string;
  email: string;
  message: string;
  airtableTableName: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!apiKey || !from) {
    throw new Error("Missing RESEND_API_KEY or RESEND_FROM_EMAIL");
  }

  const resend = new Resend(apiKey);
  const baseId = process.env.AIRTABLE_BASE_ID?.trim() ?? "";

  const baseLine = baseId
    ? `Saved to Airtable (base ${baseId}) in table "${input.airtableTableName}".`
    : `Saved to Airtable in table "${input.airtableTableName}".`;

  const text = [
    `New submission: ${PARTNER_FORM_NAME}`,
    "",
    "Submitter:",
    `  Name: ${input.fullName}`,
    `  Email: ${input.email}`,
    "",
    `Message:\n${input.message}`,
    "",
    baseLine,
  ].join("\n");

  const html = `
    <p><strong>New submission:</strong> ${PARTNER_FORM_NAME}</p>
    <p><strong>Submitter</strong></p>
    <ul>
      <li>Name: ${escapeHtml(input.fullName)}</li>
      <li>Email: ${escapeHtml(input.email)}</li>
    </ul>
    <p><strong>Message</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
    <p>${escapeHtml(baseLine)}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [notifyRecipient()],
    subject: `Partner enquiry from ${input.fullName}`,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
