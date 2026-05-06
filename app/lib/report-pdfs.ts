export type ReportEdition = "past" | "latest";

export const REPORT_PDF_ASSETS: Record<
  ReportEdition,
  { pdfPath: string; downloadFileName: string }
> = {
  past: {
    pdfPath: "/reports/playbooks-report-may-2025.pdf",
    downloadFileName: "Playbooks Report May 2025.pdf",
  },
  latest: {
    pdfPath: "/reports/playbooks-report-may-2026.pdf",
    downloadFileName: "Playbooks Report May 2026.pdf",
  },
};
