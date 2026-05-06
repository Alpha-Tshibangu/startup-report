export type ReportEdition = "past" | "latest";

export const REPORT_PDF_ASSETS: Record<
  ReportEdition,
  { pdfPath: string; downloadFileName: string }
> = {
  past: {
    pdfPath: "/reports/startup-playbooks-report-may-2025.pdf",
    downloadFileName: "STARTUP PLAYBOOKS REPORT - MAY 2025.pdf",
  },
  latest: {
    /** Placeholder — replace file at this path when the new edition is ready */
    pdfPath: "/reports/startup-playbooks-report-latest.pdf",
    downloadFileName: "Startup Playbooks Report (Latest edition).pdf",
  },
};
