import type { Metadata } from "next";
import Image from "next/image";
import { ContactFormModal } from "./_components/ContactFormModal";
import { MobileMenu } from "./_components/MobileMenu";
import { ReportRequestModal } from "./_components/ReportRequestModal";

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

const featuredCompanies = [
  {
    name: "Lorikeet",
    logo: "/logos/lorikeet.svg",
    logoClass: "h-7 w-32",
  },
  { name: "Hnry", logo: "/logos/hnry.svg", logoClass: "h-9 w-20" },
  { name: "Heidi", logo: "/logos/heidi.svg", logoClass: "h-10 w-30" },
  { name: "nexl", logo: "/logos/nexl.svg", logoClass: "h-7 w-24" },
  { name: "AutoGrab", logo: "/logos/autograb.svg", logoClass: "h-7 w-32" },
  { name: "kismet", logo: "/logos/kismet-wordmark.svg", logoClass: "h-7 w-28" },
  { name: "go1", logo: "/logos/go1-wordmark.png", logoClass: "h-9 w-16" },
  { name: "Neara", logo: "/logos/neara.svg", logoClass: "h-7 w-28" },
];

export default function Page() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-100 text-foreground dark:bg-zinc-950">
      <MobileMenu />
      <main className="flex flex-1 flex-col">
        <div className="relative flex flex-1 overflow-x-hidden lg:overflow-hidden">
          {/* overall background treatment */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,0,0,0.06),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(0,0,0,0.05),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.06),transparent_45%)]" />
            <div className="absolute inset-0 opacity-[0.65] dark:opacity-[0.75] bg-[url('/noise.svg')]" />
          </div>

          <div className="grid min-h-svh w-full grid-cols-1 lg:grid-cols-2">
            {/* Left: Harvey-style image-backed hero panel */}
            <div className="relative min-h-svh overflow-hidden bg-black text-zinc-50">
              <div className="absolute inset-0">
                {/* base background image */}
                <div className="absolute inset-0 scale-[1.18] bg-[url('/left-panel-bg.jpg')] bg-cover bg-position-[center_62%]" />

                {/* deep frost overlay */}
                <div className="absolute inset-0 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_55%),linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.75))]" />

                {/* texture layers */}
                <div className="absolute inset-0 bg-black/18" />
                <div className="absolute inset-0 opacity-[0.95] mix-blend-overlay bg-[url('/noise.svg')]" />
                <div className="absolute inset-0 opacity-[0.35] mix-blend-soft-light bg-[url('/noise.svg')]" />
              </div>

              {/* left panel is static (no scrolling) */}
              <div className="relative z-10 flex min-h-svh flex-col justify-between px-6 pb-10 pt-10 lg:px-10 lg:pb-12 lg:pt-12">
                {/* top brand */}
                <Image
                  src="/curiosity-centre-logo-blue.png"
                  alt="Curiosity Centre"
                  width={385}
                  height={85}
                  priority
                  className="-mt-7 hidden h-auto w-44 object-contain brightness-0 invert sm:w-52 lg:block lg:w-56"
                />

                {/* hero */}
                <div className="mt-24 max-w-[28rem] lg:mt-10 xl:max-w-[36rem]">
                  <h1 className="font-display text-[4.6rem] font-normal italic leading-[0.86] tracking-[-0.045em] text-zinc-50 md:text-[5.4rem] xl:text-[6.4rem]">
                    The Startup
                    <br />
                    Playbooks Top
                    <br />
                    Teams Rely On
                  </h1>
                  <ReportRequestModal />
                </div>

                {/* bottom copy */}
                <div className="max-w-xl">
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-200/80">
                    Customer impact
                  </div>
                  <div className="mt-4 text-base leading-7 text-zinc-50/90">
                    A qualitative + quantitative assessment of Australian startups — benchmarks
                    by stage, recurring operator systems, and practical checklists you can use
                    in your weekly cadence.
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Harvey-style stats / proof panel */}
            <div className="relative overflow-hidden bg-[#111719] text-zinc-50 lg:min-h-svh">
              <div className="absolute inset-0 opacity-[0.18] bg-[url('/noise.svg')]" />
              <div className="relative z-10 flex flex-col px-6 pb-10 pt-10 lg:min-h-svh lg:justify-between lg:px-10 lg:pb-12 lg:pt-12">
                <div className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-3 text-sm text-zinc-200/85 lg:flex">
                  <a href="https://curiositycentre.com/" className="hover:text-white">
                    About Us
                  </a>
                  <a
                    href="https://curiositycentre.com/the-high-flyers-podcast"
                    className="hover:text-white"
                  >
                    Podcast
                  </a>
                  <a href="https://curiositycentre.com/#events" className="hover:text-white">
                    Events
                  </a>
                  <a
                    href="https://curiositycentre.com/#wf-form-Contact-Form"
                    className="hover:text-white"
                  >
                    Advisory
                  </a>
                  <ContactFormModal triggerClassName="hover:text-white" />
                </div>

                <div className="order-2 mt-10 lg:order-none">
                  <div className="border-t border-white/15" />
                  <div className="flex items-baseline justify-between gap-6 py-8">
                    <div className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-white">
                      {report.highlights[0].value}
                    </div>
                    <div className="text-sm text-zinc-200/80">Companies Benchmarked</div>
                  </div>
                  <div className="border-t border-white/15" />
                  <div className="flex items-baseline justify-between gap-6 py-8">
                    <div className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-white">
                      {report.highlights[1].value}
                    </div>
                    <div className="text-sm text-zinc-200/80">Operator Interviews</div>
                  </div>
                  <div className="border-t border-white/15" />
                  <div className="flex items-baseline justify-between gap-6 py-8">
                    <div className="font-display text-6xl leading-[0.9] tracking-[-0.03em] text-white">
                      {report.highlights[2].value}
                    </div>
                    <div className="text-sm text-zinc-200/80">Sectors Covered</div>
                  </div>
                </div>

                <div className="order-3 grid gap-10 pt-2 lg:order-none lg:grid-cols-2">
                  <div>
                    <div className="border-t border-white/15 pt-6">
                      <Image
                        src="/curiosity-centre-logo-blue.png"
                        alt="Curiosity Centre"
                        width={385}
                        height={85}
                        className="h-auto w-36 object-contain brightness-0 invert"
                      />
                      <div className="mt-2 text-sm leading-6 text-zinc-200/80">
                        Playbooks for founders, CEOs, and investors operating in Australia.
                      </div>
                    </div>
                    <div className="mt-3 text-sm leading-6 text-zinc-200/80">
                      Practical benchmarks and operating systems you can apply the same week.
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-white/15 pt-6">
                      <div className="text-white" aria-label="X">
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="h-5 w-5 fill-current"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <div className="mt-2 text-sm text-zinc-200/80">@curiositycentre ↗</div>
                    </div>
                    <div className="mt-4 text-base leading-7 text-white/90">
                      “Signal over noise. A useful operating reference for teams trying to turn
                      growth into repeatability.”
                    </div>
                  </div>
                </div>

                <div className="order-1 mt-4 border-t border-white/10 pt-8 lg:order-none lg:mt-0">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.22em] text-zinc-200/45">
                    Featured companies include
                  </div>
                  <div
                    className="relative mt-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] lg:mt-0"
                    aria-label="Featured companies"
                  >
                    <div className="logo-marquee flex w-max items-center gap-10 text-zinc-200/60">
                      {[...featuredCompanies, ...featuredCompanies].map((company, idx) => (
                        <div
                          key={`${company.name}-${idx}`}
                          className="flex h-10 shrink-0 items-center whitespace-nowrap opacity-70"
                        >
                          <Image
                            src={company.logo}
                            alt={company.name}
                            width={160}
                            height={48}
                            className={[
                              "object-contain brightness-0 invert",
                              company.logoClass,
                            ].join(" ")}
                          />
                        </div>
                      ))}
                    </div>
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
