import Link from "next/link";
import { MODULES, TESTIMONIALS, SITE } from "@/lib/constants";
import { Badge, Btn, SectionLabel, Stars } from "@/components/ui/Primitives";
import { IconCheck, IconShield, IconTarget, IconVideo, IconBook, IconPen, IconUsers, IconMail } from "@/components/Icons";

export const metadata = {
  title: { absolute: "CASPer Prep by TSA | Expert Strategy Course v2.0" },
  description: "Stop guessing. Start scoring in the top quartile. 7 modules, expert video tutorials, 40+ high-impact ideas, and practice scenarios with sample answers. $249 CAD one-time.",
};

export default function HomePage() {
  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="bg-gradient-to-br from-brand-blue-deep via-brand-blue-dark to-brand-blue pt-[130px] pb-[70px] md:pt-[150px] md:pb-[90px] px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="absolute -top-[200px] right-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.08)_0%,transparent_70%)]" />
        <div className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(26,79,160,0.15)_0%,transparent_70%)]" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* LEFT */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-6">
                <Badge variant="orange">Version 2.0</Badge>
                <Badge variant="blue">CASPer Expert Strategy Course</Badge>
              </div>

              <h1 className="font-display text-[36px] md:text-[46px] lg:text-[50px] font-bold text-white leading-[1.1] mb-5 tracking-tight">
                The CASPer Course<br />
                Built for the{" "}
                <span className="text-brand-orange">Top Quartile.</span>
              </h1>

              <p className="font-body text-[17px] text-white/60 leading-relaxed max-w-[480px] mx-auto lg:mx-0 mb-8">
                6 structured frameworks. 40+ high-yield questions with expert answers.
                Everything you need to stop guessing and start scoring.
              </p>

              <div className="flex gap-3 justify-center lg:justify-start flex-wrap mb-4">
                <Btn variant="primary" size="lg" href="/checkout">
                  Enroll Now — ${SITE.priceCAD} CAD
                </Btn>
                <Btn variant="secondary" size="lg" href="/course">
                  Preview the Course
                </Btn>
              </div>

              <p className="text-[12px] text-white/30 font-body">
                One-time payment &middot; 6 months access &middot; No subscriptions
              </p>
            </div>

            {/* RIGHT — Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[500px]">
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/40 bg-black/50 backdrop-blur-sm">
                  <div className="aspect-video relative">
                    <iframe
                      src="https://www.youtube.com/embed/4PpmK1d5q2I?rel=0"
                      title="Welcome to CASPer Prep by TSA"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 mt-3 justify-center lg:justify-start">
                  <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <p className="font-body text-[13px] text-white/50">Watch: See what&apos;s inside the course</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar — inside hero */}
          <div className="mt-14 pt-8 border-t border-white/[0.06]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {[
                { num: "7", label: "Complete modules" },
                { num: "40+", label: "High-yield questions" },
                { num: "40+", label: "High-impact ideas" },
                { num: "6", label: "Response frameworks" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="font-display text-[28px] md:text-[32px] font-bold text-brand-orange">{stat.num}</p>
                  <p className="font-body text-[12px] text-white/40 tracking-wide uppercase">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF BAR ═══ */}
      <section className="bg-white border-b border-surface-border py-5 px-6">
        <div className="max-w-[800px] mx-auto flex justify-center items-center gap-6 md:gap-10 flex-wrap">
          {[
            { icon: <Stars count={5} />, text: "Rated by real students" },
            { icon: <IconShield size={15} />, text: "Expert-led tutorials" },
            { icon: <IconTarget size={15} />, text: "Proven frameworks" },
            { icon: <IconVideo size={15} />, text: "Video + written prep" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              {item.icon}
              <span className="text-[12px] text-ink-muted font-body font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROBLEM ═══ */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-[760px] mx-auto">
          <div className="text-center mb-10">
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-ink leading-tight mb-4">
              CASPer Isn&apos;t Like Any Other Exam
            </h2>
            <p className="font-body text-[15px] text-ink-soft leading-relaxed max-w-[600px] mx-auto">
              No textbook. No answer key. No way to brute-force it with memorization.
              Most students walk in blind and write surface-level answers that evaluators
              see hundreds of times a day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "No structured approach", desc: "You type whatever comes to mind and hope it sounds reasonable. It doesn't." },
              { title: "Generic advice everywhere", desc: "\"Just be yourself\" and \"show empathy\" — but nobody shows you how to actually do it under pressure." },
              { title: "Zero feedback loop", desc: "Practice questions without expert-level sample answers leave you guessing if you're even close." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-surface-border">
                <div className="w-8 h-[3px] bg-red-400/80 rounded-full mb-4" />
                <h4 className="font-body text-[14px] font-semibold text-ink mb-1.5">{item.title}</h4>
                <p className="font-body text-[13px] text-ink-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT YOU GET ═══ */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-ink leading-tight mb-4">
              A Complete System — Not a Collection of Tips
            </h2>
            <p className="font-body text-[15px] text-ink-soft leading-relaxed max-w-[560px] mx-auto">
              Go from &ldquo;I don&apos;t know where to start&rdquo; to
              &ldquo;I know exactly what to write&rdquo; with structured frameworks
              that work under real exam pressure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <IconBook size={20} />, title: "7 Progressive Modules", desc: "Each builds on the last — from foundations to test-day strategy." },
              { icon: <IconPen size={20} />, title: "6 Response Frameworks", desc: "A dedicated structure for each CASPer question type. No more guessing." },
              { icon: <IconTarget size={20} />, title: "40+ High-Impact Ideas", desc: "Creative, mature examples you can adapt to any scenario instantly." },
              { icon: <IconUsers size={20} />, title: "Expert Sample Answers", desc: "See exactly what top-quartile responses look like — word for word." },
              { icon: <IconVideo size={20} />, title: "Video Analysis Tutorials", desc: "Watch an expert break down real scenarios and explain the reasoning." },
              { icon: <IconShield size={20} />, title: "Practice Under Pressure", desc: "40+ timed questions with structured response areas to simulate the real exam." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-surface-border hover:border-brand-blue/20 hover:shadow-sm transition-all bg-brand-blue-light/30">
                <div className="w-10 h-10 rounded-lg bg-white border border-surface-border flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-body text-[14px] font-semibold text-ink mb-1">{item.title}</h4>
                  <p className="font-body text-[13px] text-ink-muted leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MODULES ═══ */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>Course Breakdown</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-ink leading-tight">
              7 Modules. One Clear Path.
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {MODULES.map((mod) => (
              <div
                key={mod.num}
                className={`bg-white rounded-xl p-5 md:p-6 flex gap-4 items-start ${
                  mod.highlight ? "border-2 border-brand-orange" : "border border-surface-border"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-base shrink-0 ${
                    mod.highlight
                      ? "bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white"
                      : "bg-brand-blue-light text-brand-blue"
                  }`}
                >
                  {mod.num}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-body text-[14px] font-semibold text-ink">
                      {mod.title}
                    </h3>
                    {mod.highlight && <Badge variant="orange">3 Video Sessions</Badge>}
                    <span className="text-[11px] text-ink-muted font-body">{mod.lessons} lessons</span>
                  </div>
                  <p className="font-body text-[13px] text-ink-muted leading-relaxed mb-2">
                    {mod.desc}
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    {mod.items.map((item, j) => (
                      <span key={j} className="flex items-center gap-1.5 text-[11px] text-ink-soft font-body">
                        <IconCheck size={12} /> {item}
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
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>Student Results</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-ink">
              Don&apos;t Take Our Word For It
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-surface-cream rounded-xl p-6 md:p-7 border border-surface-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-orange-light flex items-center justify-center font-display font-bold text-brand-orange-dark text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-body text-[13px] font-semibold text-ink">{t.name}</p>
                      <p className="font-body text-[11px] text-ink-muted">{t.tag}</p>
                    </div>
                  </div>
                  <Stars count={5} />
                </div>
                <p className="font-body text-[14px] text-ink-soft leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="bg-surface-cream py-20 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-11">
            <SectionLabel>Pricing</SectionLabel>
            <h2 className="font-display text-[28px] md:text-[32px] font-bold text-ink">
              Invest in Your Score
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[760px] mx-auto">
            {/* Course */}
            <div className="bg-white rounded-2xl p-7 md:p-8 border-2 border-brand-orange relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase font-body whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="font-display text-xl font-bold text-ink mb-1">Complete Course</h3>
              <p className="font-body text-[13px] text-ink-muted mb-5">
                Full 7-module self-paced program
              </p>
              <div className="mb-6">
                <span className="font-display text-[40px] font-bold text-ink">${SITE.priceCAD}</span>
                <span className="text-base text-ink-muted font-body"> CAD</span>
                <p className="text-[12px] text-ink-muted font-body mt-1">
                  ~${SITE.priceUSD} USD &middot; One-time payment
                </p>
              </div>
              <div className="flex-1 mb-6 space-y-2.5">
                {[
                  "All 7 modules + 35 lessons",
                  "6 response frameworks",
                  "40+ high-impact ideas bank",
                  "40+ practice questions + expert answers",
                  "3 expert video analysis tutorials",
                  "Self-evaluation & tracking tools",
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
            <div className="bg-white rounded-2xl p-7 md:p-8 border border-surface-border flex flex-col">
              <h3 className="font-display text-xl font-bold text-ink mb-1">Full Support Package</h3>
              <p className="font-body text-[13px] text-ink-muted mb-5">
                Course + personalized 1-on-1 coaching
              </p>
              <div className="mb-6">
                <span className="font-display text-[26px] font-bold text-ink">Custom Pricing</span>
                <p className="text-[12px] text-ink-muted font-body mt-1">Tailored to your timeline</p>
              </div>
              <div className="flex-1 mb-6 space-y-2.5">
                {[
                  "Everything in the Complete Course",
                  "1-on-1 personalized CASPer coaching",
                  "Direct feedback on your responses",
                  "Custom practice plan",
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

      {/* ═══ FINAL CTA ═══ */}
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute -bottom-[60px] -left-[60px] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(232,168,37,0.1)_0%,transparent_70%)]" />
        <div className="max-w-[540px] mx-auto relative z-10">
          <h2 className="font-display text-[26px] md:text-[30px] font-bold text-white leading-tight mb-4">
            Your CASPer Score Is<br />One Decision Away
          </h2>
          <p className="font-body text-[15px] text-white/50 leading-relaxed mb-8">
            Every day without a strategy is a day wasted.
            Get the frameworks, the practice, and the confidence.
          </p>
          <Btn variant="primary" size="lg" href="/checkout">
            Start Your Preparation
          </Btn>
        </div>
      </section>
    </div>
  );
}