import Link from "next/link";
import { MODULES, TESTIMONIALS, SITE } from "@/lib/constants";
import { Badge, Btn, SectionLabel, Stars } from "@/components/ui/Primitives";
import { IconCheck, IconShield, IconTarget, IconVideo, IconBook, IconPen, IconUsers, IconMail } from "@/components/Icons";

export const metadata = {
  title: "CASPer Prep by TSA | Expert Strategy Course v2.0",
  description: "Stop guessing. Start scoring in the top quartile. 7 modules, expert video tutorials, 40+ high-impact ideas, and practice scenarios with sample answers. $249 CAD one-time.",
};

export default function HomePage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="bg-gradient-to-br from-brand-blue-deep via-brand-blue-dark to-brand-blue pt-[150px] pb-[100px] px-6 relative overflow-hidden">
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        {/* Orange glow */}
        <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.12)_0%,transparent_70%)]" />

        <div className="max-w-[820px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-5">
            <Badge variant="orange">Version 2.0</Badge>
            <Badge variant="blue">CASPer Expert Strategy Course</Badge>
          </div>

          <h1 className="font-display text-4xl md:text-[54px] font-bold text-white leading-[1.12] mb-5 tracking-tight text-balance">
            Stop Guessing.{" "}
            <span className="text-brand-orange">Start Scoring in the Top Quartile.</span>
          </h1>

          <p className="font-body text-lg text-white/[0.68] leading-relaxed max-w-[580px] mx-auto mb-9">
            The structured, strategy-first CASPer preparation course built for future
            healthcare professionals who want frameworks, not guesswork.
          </p>

          <div className="flex gap-3.5 justify-center flex-wrap">
            <Btn variant="primary" size="lg" href="/checkout">
              Enroll Now — ${SITE.priceCAD} CAD
            </Btn>
            <Btn variant="secondary" size="lg" href="/course">
              Preview the Course
            </Btn>
          </div>

          <p className="text-[13px] text-white/40 mt-4 font-body">
            One-time payment &middot; 6 months of access &middot; No subscriptions
          </p>
        </div>
      </section>

      {/* ═══ PROOF BAR ═══ */}
      <section className="bg-white border-b border-surface-border py-6 px-6">
        <div className="max-w-[900px] mx-auto flex justify-center items-center gap-6 md:gap-10 flex-wrap">
          {[
            { icon: <Stars count={5} />, text: "Rated by real students" },
            { icon: <IconShield size={16} />, text: "7 comprehensive modules" },
            { icon: <IconTarget size={16} />, text: "40+ high-impact ideas" },
            { icon: <IconVideo size={16} />, text: "Expert video tutorials" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {item.icon}
              <span className="text-[13px] text-ink-soft font-body">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-[760px] mx-auto text-center">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="font-display text-[28px] md:text-[30px] font-bold text-ink leading-tight mb-5">
            Most Students Walk Into CASPer Completely Unprepared
          </h2>
          <p className="font-body text-base text-ink-soft leading-relaxed mb-9">
            The CASPer exam has no textbook and no definitive answer key. Unlike the MCAT or
            DAT, you can&apos;t brute-force it with memorization. Most prep resources give you
            vague advice without showing you how to actually execute under a 5-minute time
            constraint. That&apos;s why students freeze, ramble, or write surface-level answers
            that evaluators see hundreds of times a day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            {[
              { title: "No structured approach", desc: "Most students type whatever comes to mind and hope it sounds reasonable." },
              { title: "Generic online advice", desc: "Free resources repeat the same surface-level tips without actionable frameworks." },
              { title: "No expert-level answers", desc: "Practice questions without detailed sample answers leave you guessing if you're on track." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-[10px] border border-surface-border">
                <div className="w-8 h-[3px] bg-red-500 rounded-full mb-3.5" />
                <h4 className="font-body text-sm font-semibold text-ink mb-1.5">{item.title}</h4>
                <p className="font-body text-[13px] text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[760px] mx-auto text-center">
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="font-display text-[28px] md:text-[30px] font-bold text-ink leading-tight mb-4">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          <p className="font-body text-base text-ink-soft leading-relaxed mb-11">
            This isn&apos;t a collection of random tips. It&apos;s a complete system designed
            to take you from &quot;I don&apos;t know where to start&quot; to &quot;I know
            exactly what to write and say.&quot;
          </p>
        </div>
        <div className="max-w-[880px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: <IconBook size={20} />, title: "7 Complete Modules", desc: "Structured progression from foundations through test-day strategy." },
            { icon: <IconPen size={20} />, title: "Response Frameworks", desc: "Proven templates for both typed and video CASPer responses." },
            { icon: <IconTarget size={20} />, title: "40+ High-Impact Ideas", desc: "Creative, mature examples you can adapt to any scenario." },
            { icon: <IconUsers size={20} />, title: "Expert Sample Answers", desc: "See exactly what a top-quartile response looks like." },
            { icon: <IconVideo size={20} />, title: "Video Analysis Tutorials", desc: "Expert-led breakdowns of real CASPer scenarios." },
            { icon: <IconShield size={20} />, title: "Timed Practice Simulations", desc: "Build real exam confidence under actual time constraints." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3.5 p-[22px] rounded-[10px] border border-surface-border bg-brand-blue-light">
              <div className="w-[42px] h-[42px] rounded-[10px] bg-white border border-surface-border flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-body text-sm font-semibold text-ink mb-1">{item.title}</h4>
                <p className="font-body text-[13px] text-ink-muted leading-snug">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ MODULES ═══ */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>Course Breakdown</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[30px] font-bold text-ink leading-tight">
              7 Modules. One Clear Path to Confidence.
            </h2>
          </div>

          <div className="flex flex-col gap-3.5">
            {MODULES.map((mod) => (
              <div
                key={mod.num}
                className={`bg-white rounded-xl p-6 md:p-7 flex gap-5 items-start ${
                  mod.highlight ? "border-2 border-brand-orange" : "border border-surface-border"
                }`}
              >
                <div
                  className={`w-[46px] h-[46px] rounded-xl flex items-center justify-center font-display font-bold text-lg shrink-0 ${
                    mod.highlight
                      ? "bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white"
                      : "bg-brand-blue-light text-brand-blue"
                  }`}
                >
                  {mod.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                    <h3 className="font-body text-base font-semibold text-ink">
                      Module {mod.num}: {mod.title}
                    </h3>
                    {mod.highlight && <Badge variant="orange">3 Video Sessions</Badge>}
                  </div>
                  <p className="font-body text-[13px] text-ink-muted leading-relaxed mb-2.5">
                    {mod.desc}
                  </p>
                  <div className="flex gap-3.5 flex-wrap">
                    {mod.items.map((item, j) => (
                      <span key={j} className="flex items-center gap-1.5 text-[12px] text-ink-soft font-body">
                        <IconCheck size={13} /> {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[880px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>What Students Say</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[30px] font-bold text-ink">
              Real Students. Real Results.
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-surface-cream rounded-xl p-7 border border-surface-border">
                <Stars count={5} />
                <p className="font-body text-sm text-ink-soft leading-relaxed italic mt-3.5 mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-[34px] h-[34px] rounded-full bg-brand-orange-light flex items-center justify-center font-display font-bold text-brand-orange-dark text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-body text-[13px] font-semibold text-ink">{t.name}</p>
                    <p className="font-body text-[11px] text-ink-muted">{t.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>Invest in Your Score</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[30px] font-bold text-ink">
              Choose Your Path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[760px] mx-auto">
            {/* Course */}
            <div className="bg-white rounded-[14px] p-8 border-2 border-brand-orange relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase font-body">
                Most Popular
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-1">Complete Course</h3>
              <p className="font-body text-[13px] text-ink-muted mb-5">
                Full 7-module self-paced program &middot; v2.0
              </p>
              <div className="mb-5">
                <span className="font-display text-[42px] font-bold text-ink">${SITE.priceCAD}</span>
                <span className="text-base text-ink-muted font-body"> CAD</span>
                <p className="text-[12px] text-ink-muted font-body mt-0.5">
                  Approx. ~${SITE.priceUSD} USD &middot; One-time payment
                </p>
              </div>
              <div className="flex-1 mb-5 space-y-2.5">
                {[
                  "All 7 modules",
                  "Expert-led video analysis tutorials",
                  "40+ high-impact example ideas bank",
                  "Practice scenarios with expert answers",
                  "Response frameworks for typed & video",
                  "Timed practice simulations",
                  "6 months of full access",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5"><IconCheck size={14} /></div>
                    <span className="text-[13px] text-ink-soft font-body leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <Btn variant="primary" size="md" full href="/checkout">
                Enroll Now
              </Btn>
            </div>

            {/* Full Support */}
            <div className="bg-white rounded-[14px] p-8 border border-surface-border flex flex-col">
              <h3 className="font-display text-xl font-bold text-ink mb-1">Full Support Package</h3>
              <p className="font-body text-[13px] text-ink-muted mb-5">
                Course + personalized 1-on-1 guidance
              </p>
              <div className="mb-5">
                <span className="font-display text-[26px] font-bold text-ink">Custom Pricing</span>
                <p className="text-[12px] text-ink-muted font-body mt-0.5">Tailored to your needs</p>
              </div>
              <div className="flex-1 mb-5 space-y-2.5">
                {[
                  "Everything in the Complete Course",
                  "1-on-1 personalized CASPer coaching",
                  "Direct feedback on your responses",
                  "Custom practice plan for your timeline",
                  "Priority email support",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5"><IconCheck size={14} /></div>
                    <span className="text-[13px] text-ink-soft font-body leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${SITE.email}?subject=Full%20Support%20Package%20Inquiry`}
                className="flex items-center justify-center gap-2.5 px-7 py-3 rounded-lg font-body font-semibold text-[15px] no-underline bg-brand-blue text-white hover:brightness-110 transition-all w-full"
              >
                <IconMail size={16} className="text-white" /> Contact for Details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute -bottom-[60px] -left-[60px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.1)_0%,transparent_70%)]" />
        <div className="max-w-[580px] mx-auto relative z-10">
          <h2 className="font-display text-[26px] md:text-[28px] font-bold text-white leading-tight mb-3.5">
            Your CASPer Score Is One Decision Away
          </h2>
          <p className="font-body text-base text-white/60 leading-relaxed mb-7">
            Every day you spend preparing without a strategy is a day wasted. Get the
            frameworks, the practice, and the confidence.
          </p>
          <Btn variant="primary" size="lg" href="/checkout">
            Start Your Preparation
          </Btn>
        </div>
      </section>
    </div>
  );
}
