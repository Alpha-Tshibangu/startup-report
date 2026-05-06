import type { Metadata } from "next";
import Image from "next/image";
import { ContactFormModal } from "./_components/ContactFormModal";
import { InsightCardTile, type InsightCardModel } from "./_components/InsightCardTile";
import { MobileMenu } from "./_components/MobileMenu";
import { ReportRequestModal } from "./_components/ReportRequestModal";

export const metadata: Metadata = {
  title: "Startup Playbooks Report — Australia | Curiosity Centre",
  description:
    "A qualitative + quantitative assessment of startup performance in Australia, with practical operator playbooks and benchmarks.",
};

/** Logos for the hero — “Current edition features insights from” */
const featuredCompaniesMarquee = [
  { name: "Mutinex", logo: "/logos/mutinex.svg", logoClass: "h-8 w-[8.5rem]" },
  { name: "Airwallex", logo: "/logos/airwallex.png", logoClass: "h-7 w-44" },
  { name: "AutoGrab", logo: "/logos/autograb.svg", logoClass: "h-8 w-32" },
  { name: "Hapana", logo: "/logos/hapana.svg", logoClass: "h-9 w-28" },
  { name: "Rosterfy", logo: "/logos/rosterfy-wordmark.svg", logoClass: "h-9 w-44" },
  { name: "Everlab", logo: "/logos/everlab.svg", logoClass: "h-8 w-28" },
];

/** Logos for the right column — “Past edition features insights from” */
const featuredCompanies = [
  { name: "Lorikeet", logo: "/logos/lorikeet.svg", logoClass: "h-9 w-auto max-w-[9.5rem]" },
  { name: "Hnry", logo: "/logos/hnry.svg", logoClass: "h-12 w-auto max-w-[14rem]" },
  { name: "Heidi", logo: "/logos/heidi.svg", logoClass: "h-12 w-auto max-w-44" },
  { name: "nexl", logo: "/logos/nexl.svg", logoClass: "h-9 w-auto max-w-32" },
  { name: "AutoGrab", logo: "/logos/autograb.svg", logoClass: "h-9 w-auto max-w-36" },
  { name: "Kismet", logo: "/logos/kismet-wordmark.svg", logoClass: "h-9 w-auto max-w-32" },
  { name: "Go1", logo: "/logos/go1-wordmark.png", logoClass: "h-12 w-auto max-w-44" },
  { name: "Neara", logo: "/logos/neara.svg", logoClass: "h-9 w-auto max-w-32" },
];

type InsightCard = InsightCardModel;

const insightCards: InsightCard[] = [
  {
    href: "https://curiositycentre.com/the-high-flyers-podcast",
    title: "Listen to company leaders unpack their growth playbooks",
    overlayHeroBackground: true,
    heroForegroundTitle: "The High Flyers Podcast",
    heroTilePaddingClass: "px-3 py-6 sm:px-4 sm:py-8",
    heroTitleWidthClass: "mx-auto w-full max-w-[10.5rem] sm:max-w-[12rem]",
  },
  {
    href: "https://curiositycentre.com/",
    title: "Access past editions",
    overlayHeroBackground: true,
    heroForegroundTitle: "Playbook Archive",
    reportEdition: "past",
  },
];

/** Eyebrow labels (marquee section titles, etc.) */
const eyebrowClass =
  "mb-4 text-[11px] uppercase tracking-[0.22em] text-zinc-200/90";

/**
 * Infinite logo marquee (CSS-only, seamless loop).
 *
 * - Outer: `overflow-hidden` + edge mask is on the parent in the page.
 * - Track: one `display: flex; flex-wrap: nowrap; width: max-content` row.
 * - Content: `[...logos, ...logos]` — the second copy must be identical to the first.
 * - Spacing: uniform `gap-x` between items (replaces per-item margin so gutters stay even).
 * - Animation: `@keyframes logo-marquee { to { transform: translateX(-50%); } }`
 */
function LogoMarqueeTrack({
  companies,
  instanceId,
}: {
  companies: readonly { name: string; logo: string; logoClass: string }[];
  instanceId: string;
}) {
  const duplicated = [...companies, ...companies];

  return (
    <div className="motion-safe:animate-logo-marquee flex w-max shrink-0 flex-nowrap items-center gap-x-10 will-change-transform motion-reduce:animate-none">
      {duplicated.map((company, idx) => (
        <div
          key={`${instanceId}-${company.name}-${idx}`}
          className="flex h-14 w-fit min-w-0 shrink-0 items-center justify-center whitespace-nowrap opacity-85 text-zinc-200/70"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={240}
            height={64}
            className={[
              "object-contain object-center brightness-0 invert",
              company.logoClass,
            ].join(" ")}
          />
        </div>
      ))}
    </div>
  );
}

/** Static logo grid: six logos in two rows of three. */
function CurrentEditionLogoGrid({
  companies,
  id,
}: {
  companies: readonly { name: string; logo: string; logoClass: string }[];
  id: string;
}) {
  return (
    <div
      className="grid grid-cols-3 justify-items-center gap-x-3 gap-y-5 text-zinc-200/75 sm:gap-x-6 sm:gap-y-6"
      aria-label="Featured companies"
    >
      {companies.map((company, idx) => (
        <div
          key={`${id}-${company.name}-${idx}`}
          className="flex h-12 w-full min-w-0 max-w-full items-center justify-center opacity-90"
        >
          <Image
            src={company.logo}
            alt={company.name}
            width={240}
            height={64}
            className={[
              "max-h-12 max-w-full object-contain object-center brightness-0 invert",
              company.logoClass,
            ].join(" ")}
          />
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-100 text-foreground dark:bg-zinc-950 lg:h-dvh lg:max-h-dvh lg:overflow-hidden">
      <MobileMenu />
      <main className="flex min-h-0 flex-1 flex-col lg:overflow-hidden">
        <div className="relative flex min-h-0 flex-1 overflow-x-hidden lg:overflow-hidden">
          {/* overall background treatment */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,0,0,0.06),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(0,0,0,0.05),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(255,255,255,0.06),transparent_45%)]" />
            <div className="absolute inset-0 opacity-[0.65] dark:opacity-[0.75] bg-[url('/noise.svg')]" />
          </div>

          <div className="grid w-full min-h-svh flex-1 grid-cols-1 auto-rows-auto lg:min-h-0 lg:h-full lg:max-h-full lg:grid-cols-2 lg:grid-rows-1">
            {/* Left: Harvey-style image-backed hero panel */}
            <div className="relative min-h-svh overflow-hidden bg-black text-zinc-50 lg:h-full lg:min-h-0 lg:max-h-full">
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
              <div className="relative z-10 flex min-h-svh flex-col px-6 pb-10 pt-10 lg:h-full lg:min-h-0 lg:max-h-full lg:px-10 lg:pb-12 lg:pt-12">
                {/* top brand */}
                <Image
                  src="/curiosity-centre-logo-blue.png"
                  alt="Curiosity Centre"
                  width={385}
                  height={85}
                  priority
                  className="-mt-7 hidden h-auto w-44 shrink-0 object-contain brightness-0 invert sm:w-52 lg:block lg:w-64"
                />

                {/* hero — vertically centered in column (below logo when present) */}
                <div className="flex min-h-0 flex-1 flex-col justify-center">
                  <div className="max-w-[32rem] xl:max-w-[40rem]">
                    <h1 className="font-display text-[2.35rem] font-normal italic leading-[1.08] tracking-[-0.03em] text-zinc-50 sm:text-[2.75rem] md:text-[3.15rem] lg:text-[3.35rem] xl:text-[3.65rem]">
                      Built for founders, operators, and investors who care about{" "}
                      <span
                        className={[
                          "text-white/95",
                          "[text-shadow:0_0_18px_rgba(255,255,255,0.35),0_0_36px_rgba(255,255,255,0.18),0_0_54px_rgba(255,255,255,0.08)]",
                        ].join(" ")}
                      >
                        execution over hype.
                      </span>
                    </h1>
                    <div className="mt-8 w-full min-w-0 py-2">
                      <div className={eyebrowClass}>Current edition features insights from</div>
                      <CurrentEditionLogoGrid
                        companies={featuredCompaniesMarquee}
                        id="current-edition"
                      />
                    </div>
                    <ReportRequestModal />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Harvey-style stats / proof panel */}
            <div className="relative min-h-svh overflow-hidden bg-[#111719] text-zinc-50 lg:h-full lg:min-h-0 lg:max-h-full">
              <div className="absolute inset-0 opacity-[0.18] bg-[url('/noise.svg')]" />
              <div className="relative z-10 flex h-full min-h-0 flex-col px-6 pb-10 pt-10 lg:max-h-full lg:justify-between lg:overflow-hidden lg:px-10 lg:pb-12 lg:pt-12">
                <div className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-3 text-sm text-zinc-200/85 lg:mb-8 lg:flex">
                  <a href="https://curiositycentre.com/" className="hover:text-white">
                    About Curiosity Centre
                  </a>
                  <a
                    href="https://curiositycentre.com/the-high-flyers-podcast"
                    className="hover:text-white"
                  >
                    The High Flyers Podcast
                  </a>
                  <ContactFormModal
                    triggerLabel="Partner with Us"
                    triggerClassName="hover:text-white"
                  />
                </div>

                <div className="order-1 mt-10 lg:order-none lg:mt-0">
                  <div className="border-t border-white/15" />
                  <div className="py-8">
                    <div className={eyebrowClass}>Past edition features insights from</div>
                    <div
                      className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
                      aria-label="Featured companies"
                    >
                      <LogoMarqueeTrack
                        companies={featuredCompanies}
                        instanceId="past-edition"
                      />
                    </div>
                  </div>
                </div>

                <div className="order-2 lg:order-none">
                  <div className="border-t border-white/15" />
                  <div className="py-8">
                    <p className="max-w-xl font-display text-xl font-normal leading-snug tracking-[-0.03em] text-zinc-100 sm:text-2xl">
                      Read by <span className="tabular-nums">5,250+</span> founders, executives and
                      investors
                    </p>
                  </div>
                </div>

                <div className="order-3 grid gap-10 pb-10 lg:order-none lg:grid-cols-2 lg:pb-12">
                  <div>
                    <div className="border-t border-white/15 pt-6">
                      <div className="text-base leading-7 text-white/90">
                        “Grounded in real operators—not slide theory. Australian benchmarks and playbooks
                        our team uses every week.”
                      </div>
                      <div className="mt-6 min-w-0">
                        <div className="text-sm text-zinc-200/85">Jordan Lee</div>
                        <div className="mt-0.5 text-xs text-zinc-200/60">
                          Head of Go-to-Market, Google
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-white/15 pt-6">
                      <div className="text-base leading-7 text-white/90">
                        “Signal over noise. A useful operating reference for teams trying to turn
                        growth into repeatability.”
                      </div>
                      <div className="mt-6 min-w-0">
                        <div className="text-sm text-zinc-200/85">Priya Natesan</div>
                        <div className="mt-0.5 text-xs text-zinc-200/60">
                          Chief of Staff, Lorikeet
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="order-4 mt-10 lg:order-none lg:mt-0">
                  <div className="border-t border-white/15" />
                  <div className="py-8">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {insightCards.map((card) => (
                        <InsightCardTile key={card.title} card={card} />
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
