import type { Metadata } from "next";
import { ResponsiveCards } from "./_components/ResponsiveCards";
import { MiniChart } from "./_components/MiniChart";

export const metadata: Metadata = {
  title: "Startup Playbooks Report — Australia | Curiosity Centre",
  description:
    "A qualitative + quantitative assessment of startup performance in Australia, with practical operator playbooks and benchmarks.",
};

const report = {
  title: "Startup Playbooks Report",
  subtitle: "Australia · 2026 edition (mock preview)",
  updated: "Apr 2026",
  blurb:
    "A qualitative + quantitative assessment of startup performance in Australia. Built from operator interviews, founder surveys, and a benchmark dataset spanning seed → Series C (mock data for now).",
  highlights: [
    { label: "Companies benchmarked", value: "184" },
    { label: "Operator interviews", value: "63" },
    { label: "Sectors covered", value: "12" },
    { label: "Median YoY ARR growth", value: "2.4×" },
  ],
  sections: [
    {
      eyebrow: "Executive summary",
      title: "What’s changed in 2025–26",
      id: "exec-summary",
      body: [
        "Australian startups are building more durable growth curves: lower burn, higher gross margin, and faster paths to repeatable sales motions.",
        "The biggest separator is not “AI adoption”, it’s execution: instrumented funnels, ruthless ICP discipline, and weekly operating cadence.",
        "Capital is available, but the bar is higher: investors want evidence of distribution, not just product velocity.",
      ],
      bullets: [
        "Strongest cohort: B2B workflow + vertical SaaS with fast time-to-value.",
        "Most common failure mode: expanding ICP before nailing one repeatable segment.",
        "Best leading indicator: retention by cohort + sales cycle compression.",
      ],
    },
    {
      eyebrow: "Benchmarks",
      title: "Performance ranges by stage",
      id: "benchmarks",
      body: [
        "These ranges are directional and meant for pattern-matching. Use them to sanity-check targets and identify where your operating system should focus.",
      ],
      table: {
        columns: [
          "Stage",
          "ARR",
          "YoY ARR growth",
        ],
        rows: [
          ["Seed", "$0.2–$1.0m", "3.0×–6.0×"],
          ["Series A", "$1–$5m", "2.0×–4.0×"],
          ["Series B", "$5–$15m", "1.5×–3.0×"],
          ["Series C", "$15–$40m", "1.3×–2.3×"],
        ],
      },
    },
    {
      eyebrow: "Operator playbooks",
      title: "The 6 playbooks that show up everywhere",
      id: "playbooks",
      body: [
        "We mapped recurring tactics across high-performing teams. Each playbook includes a goal, how to measure it, and the week-by-week system that makes it repeatable.",
      ],
      playbooks: [
        {
          title: "ICP proof, then scale",
          desc: "Lock a single repeatable segment before expanding.",
          signals: [
            "10+ referenceable customers",
            "sales cycle < 45 days",
            "retention stable by cohort",
          ],
        },
        {
          title: "Instrumented growth loops",
          desc: "Replace “more leads” with measurable loops.",
          signals: ["activation rate tracked weekly", "one north-star event", "3 levers with owners"],
        },
        {
          title: "Enterprise readiness",
          desc: "Security + procurement pathways before you need them.",
          signals: ["SOC2 plan", "security FAQ", "deal desk checklist"],
        },
        {
          title: "Founder-led sales to sales-led",
          desc: "Codify discovery + handoff without losing signal.",
          signals: ["call library", "discovery rubric", "win/loss review cadence"],
        },
        {
          title: "Pricing as product",
          desc: "Pricing changes are a roadmap, not a debate.",
          signals: ["willingness-to-pay interviews", "packaging experiments", "discount guardrails"],
        },
        {
          title: "Operating cadence",
          desc: "A weekly system that compounds learning.",
          signals: ["WBR metrics", "single-page scorecard", "decision log"],
        },
      ],
    },
    {
      eyebrow: "Deep dives",
      title: "Australia-specific dynamics to watch",
      id: "au-dynamics",
      body: [
        "The best teams treat geography as a constraint to engineer around: distribution partners, outbound systems, and early US learnings without moving too soon.",
      ],
      bullets: [
        "US expansion: best results come after ICP clarity + proof of outbound in AU.",
        "Hiring: senior go-to-market talent is scarce—plan earlier than you think.",
        "Procurement: gov + enterprise cycles require pre-built trust assets.",
      ],
    },
  ],
};

function Stat({
  label,
  value,
  size = "md",
}: {
  label: string;
  value: string;
  size?: "md" | "xl";
}) {
  const isXL = size === "xl";
  return (
    <div
      className={[
        "w-full rounded-3xl border border-black/10 bg-white/80 backdrop-blur",
        isXL
          ? // match the reference image footprint (1821×1031 ≈ 1.766)
            "aspect-1821/1031 p-7 sm:p-10 flex flex-col justify-between"
          : "p-4",
      ].join(" ")}
    >
      <div>
        <div
          className={[
            "uppercase tracking-[0.18em] text-zinc-600",
            isXL ? "text-[11px]" : "text-xs",
          ].join(" ")}
        >
          {label}
        </div>
        <div
          className={[
            "mt-3 font-(--font-display) italic tracking-[-0.02em] text-zinc-950",
            isXL ? "text-5xl leading-[0.92] sm:text-6xl" : "text-2xl",
          ].join(" ")}
        >
          {value}
        </div>
      </div>

      {isXL ? (
        <div className="text-base leading-7 text-zinc-600">
          Qualitative + quantitative benchmark (preview).
        </div>
      ) : null}
    </div>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-black/10 bg-white/85 backdrop-blur",
        "shadow-[0_18px_55px_-40px_rgba(0,0,0,0.35)]",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function CenterMetricCard({ value, label }: { value: string; label: string }) {
  return (
    <Card className="p-8 sm:p-10">
      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
        <div className="font-(--font-display) text-6xl leading-[0.92] tracking-[-0.04em] text-zinc-950 sm:text-7xl">
          {value}
        </div>
        <div className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-zinc-600">
          {label}
        </div>
      </div>
    </Card>
  );
}

function CenterHeadingCard({
  heading,
  subtext,
}: {
  heading: string;
  subtext?: string;
}) {
  return (
    <Card className="p-8 sm:p-10">
      <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
        <div className="font-(--font-display) text-4xl leading-[0.98] tracking-[-0.03em] text-zinc-950 sm:text-5xl">
          {heading}
        </div>
        {subtext ? (
          <div className="mt-4 max-w-[34ch] text-base leading-7 text-zinc-700">
            {subtext}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

function CenterTextCard({ text }: { text: string }) {
  return (
    <Card className="p-8 sm:p-10">
      <div className="flex min-h-[280px] items-center justify-center text-center">
        <div className="max-w-[38ch] text-base leading-7 text-zinc-700">{text}</div>
      </div>
    </Card>
  );
}

export default function Page() {
  const scrollContainerId = "report-scroll";
  const sectionIds = report.sections.map((s) => s.id);
  const sectionStats: Record<string, { label: string; value: string }[]> = {
    "exec-summary": [
      { label: "Focus", value: "durability" },
      { label: "Separator", value: "execution" },
      { label: "Investor bar", value: "distribution" },
      { label: "Cadence", value: "weekly" },
    ],
    benchmarks: [
      { label: "Seed ARR", value: "$0.2–$1.0m" },
      { label: "Series A growth", value: "2–4×" },
      { label: "GM range", value: "70–90%" },
      { label: "NRR", value: "100–130%" },
    ],
    playbooks: [
      { label: "Playbooks", value: "6" },
      { label: "Goal", value: "repeatability" },
      { label: "Cadence", value: "WBR" },
      { label: "Owner", value: "named" },
    ],
    "au-dynamics": [
      { label: "Constraint", value: "geography" },
      { label: "Win", value: "distribution" },
      { label: "Hiring", value: "scarce" },
      { label: "Procurement", value: "trust assets" },
    ],
  };

  const leftCards = [
    ...report.highlights.map((s) => ({
      id: `metric-${s.label}`,
      node: <CenterMetricCard value={s.value} label={s.label} />,
    })),
    {
      id: "qualitative-analysis",
      node: (
        <CenterHeadingCard
          heading="Qualitative analysis"
          subtext="Operator interviews → recurring systems, not one-off tactics."
        />
      ),
    },
    {
      id: "qualitative-quote",
      node: (
        <CenterTextCard text="The biggest separator isn’t AI adoption — it’s execution: instrumented funnels, ruthless ICP discipline, and a weekly operating cadence." />
      ),
    },
    {
      id: "card-mini-chart",
      node: (
        <Card className="p-7 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
              Snapshot
            </div>
            <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] text-zinc-600">
              preview
            </div>
          </div>
          <div className="mt-5 text-sm leading-6 text-zinc-700">
            What the “good” curve looks like when retention holds and sales cycles compress.
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl bg-zinc-950">
            <div className="p-5">
              <MiniChart />
            </div>
          </div>
        </Card>
      ),
    },
    ...report.sections
      .flatMap((s) => {
        if ("table" in s && s.table) {
          return [
            {
              id: "card-benchmarks-table",
              node: (
                <Card className="overflow-hidden">
                  <div className="border-b border-black/10 p-7 sm:p-8">
                    <div className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
                      Benchmarks
                    </div>
                    <div className="mt-2 font-(--font-display) text-3xl tracking-tight text-zinc-950">
                      Performance ranges
                    </div>
                    <div className="mt-3 text-sm leading-6 text-zinc-700">
                      Directional ranges for pattern-matching targets by stage.
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white text-left text-sm">
                      <thead className="bg-black/3 text-xs uppercase tracking-wide text-zinc-600">
                        <tr>
                          {s.table.columns.map((c) => (
                            <th key={c} className="whitespace-nowrap px-4 py-3 font-medium">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/10">
                        {s.table.rows.map((r) => (
                          <tr key={r[0]} className="text-zinc-700">
                            {r.map((cell) => (
                              <td key={cell} className="whitespace-nowrap px-4 py-3">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              ),
            },
          ];
        }

        if ("playbooks" in s && s.playbooks) {
          return s.playbooks.map((p) => ({
            id: `card-playbook-${p.title}`,
            node: (
              <Card className="p-8 sm:p-10">
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="font-(--font-display) text-4xl leading-[0.98] tracking-[-0.03em] text-zinc-950 sm:text-5xl">
                    {p.title}
                  </div>
                  <div className="mt-4 max-w-[40ch] text-base leading-7 text-zinc-700">
                    {p.desc}
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {p.signals.map((sig) => (
                      <span
                        key={sig}
                        className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs text-zinc-600"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ),
          }));
        }

        return [];
      })
      .filter(Boolean),
  ];

  return (
    <div className="flex flex-col flex-1 bg-zinc-100 text-foreground dark:bg-zinc-950">
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-1 overflow-hidden">
          {/* overall background treatment */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,0,0,0.06),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(0,0,0,0.05),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.06),transparent_45%)]" />
            <div className="absolute inset-0 opacity-[0.65] dark:opacity-[0.75] bg-[url('/noise.svg')]" />
          </div>

          <div className="grid min-h-svh w-full grid-cols-1 lg:grid-cols-2">
            {/* Left: cards column (scrollable, stacked/rotating) */}
            <div className="relative order-2 flex min-h-svh flex-col overflow-hidden bg-white text-zinc-950 lg:order-1">
              <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-45">
                <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-zinc-950/8 blur-3xl dark:bg-white/10" />
                <div className="absolute top-40 right-[-15%] h-72 w-72 rounded-full bg-zinc-950/6 blur-3xl dark:bg-white/10" />
              </div>

              <div className="relative z-10">
                <ResponsiveCards
                  items={leftCards}
                  footerCta={
                    <a
                      href="#"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-colors hover:bg-zinc-900"
                    >
                      Get full report
                    </a>
                  }
                />
              </div>
            </div>

            {/* Right: narrative panel */}
            <div className="relative order-1 min-h-svh overflow-hidden border-l border-black/10 bg-black text-zinc-50 lg:order-2">
              <div className="absolute inset-0">
                {/* base background image */}
                <div className="absolute inset-0 scale-[1.18] bg-[url('/right-panel-bg.webp')] bg-cover bg-position-[center_62%]" />

                {/* deep frost overlay */}
                <div className="absolute inset-0 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.75))]" />

                {/* texture layers */}
                <div className="absolute inset-0 bg-black/18" />
                <div className="absolute inset-0 opacity-[0.70] mix-blend-overlay bg-[url('/noise.svg')]" />
              </div>

              {/* right panel is static (no scrolling) */}
              <div className="relative z-10 flex min-h-svh flex-col justify-start px-6 pb-10 pt-8 lg:px-10 lg:pb-10 lg:pt-8">
                <div className="flex items-start justify-between gap-6">
                  <div className="text-sm font-medium text-zinc-50/85">Curiosity Centre</div>
                  <div className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200/80">
                    Preview
                  </div>
                </div>

                <div className="mt-16">
                  <h1 className="mt-0 font-(--font-display) text-6xl italic leading-[0.90] tracking-[-0.03em] text-zinc-50">
                    <span className="block font-semibold">{report.title}</span>
                  </h1>
                  <div className="mt-16 max-w-xl text-sm text-zinc-200/80">
                    {report.subtitle}
                  </div>
                  <div className="mt-4 max-w-lg text-base leading-7 text-white">
                    A fast preview of the benchmarks and operator playbooks behind Australia’s
                    top-performing startups — directional ranges by stage, recurring operator
                    systems, and practical checklists to sharpen weekly execution.
                  </div>
                </div>

                <div className="mt-auto max-w-xl">
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-950 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] transition-colors hover:bg-zinc-200"
                    >
                      Get full report
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
