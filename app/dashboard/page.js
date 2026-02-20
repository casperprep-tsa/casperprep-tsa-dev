import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { MODULES, SITE } from "@/lib/constants";
import { Badge } from "@/components/ui/Primitives";
import { IconCheck, IconLock, IconMail, IconArrow } from "@/components/Icons";
import SignOutButton from "@/components/SignOutButton";

export const metadata = {
  title: "Dashboard",
};

/* ── Circular progress ring (SVG) ── */
function ProgressRing({ percent, size = 80, stroke = 6, color = "#F2994A" }) {
  var r = (size - stroke) / 2;
  var circ = 2 * Math.PI * r;
  var offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8E4DF" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} className="transition-all duration-700" />
    </svg>
  );
}

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const fullName = user.user_metadata?.full_name || "Student";
  const firstName = fullName.split(" ")[0];
  const email = user.email;
  const createdAt = new Date(user.created_at).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  /* ── Fetch profile (access info) ── */
  const { data: profile } = await supabase
    .from("profiles")
    .select("has_access, access_expires_at")
    .eq("id", user.id)
    .single();

  var hasAccess = false;
  var expiresAt = null;
  var daysLeft = 0;

  if (profile && profile.has_access && profile.access_expires_at) {
    var expires = new Date(profile.access_expires_at);
    if (expires > new Date()) {
      hasAccess = true;
      expiresAt = expires.toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      daysLeft = Math.ceil((expires - new Date()) / (1000 * 60 * 60 * 24));
    }
  }

  /* ── Fetch lesson progress ── */
  var completedSet = new Set();
  if (hasAccess) {
    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("module_num, lesson_num")
      .eq("user_id", user.id)
      .eq("completed", true);

    if (progress) {
      progress.forEach(function (p) {
        completedSet.add(p.module_num + "-" + p.lesson_num);
      });
    }
  }

  /* ── Calculate progress per module ── */
  var totalLessons = MODULES.reduce(function (s, m) { return s + m.lessons; }, 0);
  var completedCount = completedSet.size;
  var overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  var moduleProgress = MODULES.map(function (mod) {
    var done = 0;
    for (var l = 1; l <= mod.lessons; l++) {
      if (completedSet.has(mod.num + "-" + l)) done++;
    }
    return {
      num: mod.num,
      title: mod.title,
      desc: mod.desc,
      total: mod.lessons,
      done: done,
      percent: mod.lessons > 0 ? Math.round((done / mod.lessons) * 100) : 0,
      highlight: mod.highlight || false,
    };
  });

  var completedModules = moduleProgress.filter(function (m) { return m.done === m.total; }).length;

  /* ── Find resume point ── */
  var resumeModule = 1;
  var resumeLesson = 1;
  var resumeLabel = "Start Learning";
  var foundResume = false;
  for (var mi = 0; mi < MODULES.length; mi++) {
    for (var li = 1; li <= MODULES[mi].lessons; li++) {
      if (!completedSet.has(MODULES[mi].num + "-" + li)) {
        resumeModule = MODULES[mi].num;
        resumeLesson = li;
        resumeLabel = completedCount > 0 ? "Continue Learning" : "Start Learning";
        foundResume = true;
        break;
      }
    }
    if (foundResume) break;
  }
  if (!foundResume && completedCount > 0) {
    resumeLabel = "Review Course";
  }

  var currentModData = MODULES.find(function (m) { return m.num === resumeModule; });
  var currentModTitle = currentModData ? currentModData.title : "";

  return (
    <div>
      {/* ── Header ── */}
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[130px] pb-10 px-6">
        <div className="max-w-[900px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="font-body text-sm text-white/60 mb-1">Welcome back,</p>
            <h1 className="font-display text-[26px] md:text-[28px] font-bold text-white">
              {fullName}
            </h1>
          </div>
          <SignOutButton />
        </div>
      </section>

      <section className="bg-surface-cream px-6 py-10 pb-20">
        <div className="max-w-[900px] mx-auto">
          {!hasAccess ? (
            /* ═══════════════════════════════════════ */
            /*  NO ACCESS STATE                       */
            /* ═══════════════════════════════════════ */
            <div>
              <div className="bg-white rounded-xl border border-surface-border p-8 text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange-light flex items-center justify-center mx-auto mb-5">
                  <IconLock size={28} className="text-brand-orange" />
                </div>
                <h2 className="font-display text-xl font-bold text-ink mb-2">
                  You haven&apos;t enrolled yet
                </h2>
                <p className="font-body text-sm text-ink-muted leading-relaxed max-w-md mx-auto mb-6">
                  Your account is set up. Enroll in the CASPer Expert Strategy Course
                  to unlock all 7 modules, expert video tutorials, practice scenarios,
                  and the High-Impact Ideas Bank.
                </p>
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-brand-orange text-white font-body font-semibold text-[15px] hover:brightness-110 transition-all no-underline"
                >
                  Enroll Now — ${SITE.priceCAD} CAD
                </Link>
                <p className="text-[12px] text-ink-muted font-body mt-3">
                  One-time payment &middot; 6 months access
                </p>
              </div>

              <div className="bg-white rounded-xl border border-surface-border p-6">
                <h3 className="font-body text-sm font-bold text-ink-muted tracking-[1px] uppercase mb-4">
                  What you&apos;ll unlock
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MODULES.map((mod) => (
                    <div key={mod.num} className="flex items-center gap-3 p-3 rounded-lg bg-surface-cream">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-body shrink-0 ${mod.highlight ? "bg-brand-orange text-white" : "bg-brand-blue-light text-brand-blue"}`}>
                        {mod.num}
                      </div>
                      <div className="min-w-0">
                        <p className="font-body text-[13px] font-semibold text-ink truncate">{mod.title}</p>
                        <p className="font-body text-[11px] text-ink-muted">{mod.lessons} lessons</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ═══════════════════════════════════════ */
            /*  HAS ACCESS — FULL DASHBOARD           */
            /* ═══════════════════════════════════════ */
            <div>
              {/* ── Top Stats Row ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Overall progress */}
                <div className="bg-white rounded-xl border border-surface-border p-5 flex items-center gap-5">
                  <div className="relative shrink-0">
                    <ProgressRing percent={overallPercent} size={72} stroke={5} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-[18px] font-bold text-ink">{overallPercent}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-body text-[12px] text-ink-muted font-semibold tracking-[0.5px] uppercase mb-0.5">Overall Progress</p>
                    <p className="font-body text-[14px] font-bold text-ink">{completedCount} / {totalLessons} lessons</p>
                    <p className="font-body text-[12px] text-ink-muted">{completedModules} / {MODULES.length} modules complete</p>
                  </div>
                </div>

                {/* Quick resume */}
                <div className="bg-white rounded-xl border border-surface-border p-5 flex flex-col justify-between">
                  <div>
                    <p className="font-body text-[12px] text-ink-muted font-semibold tracking-[0.5px] uppercase mb-1">Pick Up Where You Left Off</p>
                    <p className="font-body text-[13px] text-ink-soft leading-snug">
                      Module {resumeModule}: {currentModTitle}
                    </p>
                  </div>
                  <Link
                    href={"/course/learn?m=" + resumeModule + "&l=" + resumeLesson}
                    className="mt-3 inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-brand-orange text-white font-body font-semibold text-[13px] hover:brightness-110 transition-all no-underline"
                  >
                    {resumeLabel} <IconArrow size={13} />
                  </Link>
                </div>

                {/* Access info */}
                <div className="bg-white rounded-xl border border-surface-border p-5">
                  <p className="font-body text-[12px] text-ink-muted font-semibold tracking-[0.5px] uppercase mb-2">Access Status</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-body text-[14px] font-bold text-green-700">Active</span>
                  </div>
                  <p className="font-body text-[13px] text-ink-soft">
                    Expires: {expiresAt}
                  </p>
                  <p className="font-body text-[12px] text-ink-muted mt-0.5">
                    {daysLeft} days remaining
                  </p>
                  {daysLeft <= 30 && (
                    <div className="mt-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200">
                      <p className="font-body text-[11px] text-amber-800 font-semibold">⚠️ Your access expires soon</p>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Module Progress Cards ── */}
              <div className="mb-6">
                <h2 className="font-body text-sm font-bold text-ink-muted tracking-[1px] uppercase mb-4">
                  Your Modules
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {moduleProgress.map(function (mod) {
                    var isComplete = mod.done === mod.total;

                    /* Find first incomplete lesson */
                    var nextLesson = 1;
                    for (var l = 1; l <= mod.total; l++) {
                      if (!completedSet.has(mod.num + "-" + l)) { nextLesson = l; break; }
                      if (l === mod.total) nextLesson = mod.total;
                    }

                    return (
                      <Link
                        key={mod.num}
                        href={"/course/learn?m=" + mod.num + "&l=" + nextLesson}
                        className="block bg-white rounded-xl border border-surface-border p-4 hover:shadow-md hover:border-brand-blue/30 transition-all no-underline group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={"w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold font-body shrink-0 transition-colors " + (isComplete ? "bg-green-100 text-green-700" : mod.highlight ? "bg-brand-orange text-white" : "bg-brand-blue-light text-brand-blue")}>
                            {isComplete ? (
                              <IconCheck size={18} className="text-green-600" />
                            ) : (
                              mod.num
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-body text-[14px] font-semibold text-ink truncate group-hover:text-brand-blue transition-colors">
                                Module {mod.num}: {mod.title}
                              </h3>
                              {isComplete && <Badge variant="green">Done</Badge>}
                            </div>
                            <p className="font-body text-[12px] text-ink-muted truncate">{mod.desc}</p>

                            <div className="flex items-center gap-2.5 mt-2">
                              <div className="flex-1 h-1.5 rounded-full bg-surface-border overflow-hidden">
                                <div
                                  className={"h-full rounded-full transition-all duration-500 " + (isComplete ? "bg-green-500" : "bg-brand-orange")}
                                  style={{ width: mod.percent + "%" }}
                                />
                              </div>
                              <span className="font-mono text-[11px] text-ink-muted shrink-0">
                                {mod.done}/{mod.total}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <IconArrow size={16} className="text-brand-blue" />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Account Info ── */}
          <div className="mt-6 bg-white rounded-xl border border-surface-border p-6">
            <h3 className="font-body text-sm font-bold text-ink-muted tracking-[1px] uppercase mb-4">
              Account
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-body text-[12px] text-ink-muted mb-1">Name</p>
                <p className="font-body text-sm font-medium text-ink">{fullName}</p>
              </div>
              <div>
                <p className="font-body text-[12px] text-ink-muted mb-1">Email</p>
                <p className="font-body text-sm font-medium text-ink">{email}</p>
              </div>
              <div>
                <p className="font-body text-[12px] text-ink-muted mb-1">Member since</p>
                <p className="font-body text-sm font-medium text-ink">{createdAt}</p>
              </div>
            </div>
          </div>

          {/* ── Support ── */}
          <div className="mt-6 p-5 bg-white rounded-xl border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-body text-sm font-semibold text-ink mb-0.5">Need help?</p>
              <p className="font-body text-[13px] text-ink-muted">Reach out any time for course support.</p>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-cream border border-surface-border font-body text-[13px] font-medium text-ink-soft no-underline hover:bg-gray-100 transition-colors shrink-0"
            >
              <IconMail size={15} className="text-ink-muted" /> Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}