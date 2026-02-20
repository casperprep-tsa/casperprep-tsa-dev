"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { COURSE_CONTENT } from "@/lib/course-content";
import { Badge, Btn, BrandMark } from "@/components/ui/Primitives";
import { IconCheck, IconLock, IconArrow } from "@/components/Icons";
import VideoThumbnail from "@/components/VideoThumbnail";

/* ── Render inline HTML (bold, italic, links) ── */
function RichText({ html, className }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ── Check if a lesson is an interactive practice set ── */
function isPracticeSet(lesson) {
  if (!lesson) return false;
  const t = lesson.title.toLowerCase();
  return t.includes("practice set") && !t.includes("answer key");
}

/* ── Parse practice set content into structured scenarios ── */
function parsePracticeScenarios(content) {
  const scenarios = [];
  const lines = content.split("\n");
  let current = null;
  let promptLines = [];
  let lastQ = null;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) continue;

    // Skip the set title header
    if (/^### Practice Set \d+$/.test(trimmed)) continue;

    // New scenario header
    const scenarioMatch = trimmed.match(/^### Scenario (\d+)/);
    if (scenarioMatch) {
      if (current) {
        current.prompt = promptLines.join(" ").trim();
        scenarios.push(current);
      }
      current = { num: parseInt(scenarioMatch[1]), prompt: "", questions: [] };
      promptLines = [];
      lastQ = null;
      continue;
    }

    if (!current) continue;

    // Question line: "- Q1: ..." or "- Q2: ..."
    const qMatch = trimmed.match(/^-?\s*Q(\d+)\s*[:\s]\s*(.+)$/);
    if (qMatch) {
      lastQ = { num: parseInt(qMatch[1]), text: qMatch[2].trim() };
      current.questions.push(lastQ);
      continue;
    }

    // Continuation of Q text
    if (lastQ && !trimmed.startsWith("### ") && !trimmed.match(/^-?\s*Q\d+/)) {
      lastQ.text += " " + trimmed;
      continue;
    }

    // Prompt text — skip the word "Prompt:" alone
    if (trimmed === "Prompt:" || trimmed === "Prompt") {
      lastQ = null;
      continue;
    }

    // Prompt body
    if (!trimmed.match(/^-?\s*Q\d+/)) {
      promptLines.push(trimmed.replace(/^<b>Prompt:<\/b>\s*/, ""));
      lastQ = null;
    }
  }

  if (current) {
    current.prompt = promptLines.join(" ").trim();
    scenarios.push(current);
  }

  return scenarios;
}

/* ── Download helper ── */
function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── Download icon SVG ── */
function DownloadIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ── Interactive Practice Set Renderer ── */
function PracticeSetView({ lesson, moduleNum, responses, setResponses }) {
  const scenarios = parsePracticeScenarios(lesson.content);
  const setTitle = lesson.title;

  function getKey(scenarioNum, questionNum) {
    return `${moduleNum}-${lesson.num}-s${scenarioNum}-q${questionNum}`;
  }

  function handleChange(scenarioNum, questionNum, value) {
    setResponses((prev) => ({
      ...prev,
      [getKey(scenarioNum, questionNum)]: value,
    }));
  }

  function stripHtml(str) {
    return str.replace(/<[^>]+>/g, "");
  }

  function downloadScenario(scenario) {
    let text = `${setTitle} — Scenario ${scenario.num}\n`;
    text += "=".repeat(50) + "\n\n";
    text += `Prompt:\n${stripHtml(scenario.prompt)}\n\n`;
    scenario.questions.forEach((q) => {
      text += `Q${q.num}: ${stripHtml(q.text)}\n\n`;
      const answer = responses[getKey(scenario.num, q.num)] || "(No response)";
      text += `Your Answer:\n${answer}\n\n`;
      text += "-".repeat(40) + "\n\n";
    });
    downloadText(`${setTitle.replace(/\s+/g, "_")}_Scenario_${scenario.num}.txt`, text);
  }

  function downloadAll() {
    let text = `${setTitle} — All Responses\n`;
    text += "=".repeat(50) + "\n";
    text += `Downloaded: ${new Date().toLocaleString()}\n\n`;

    scenarios.forEach((scenario) => {
      text += `${"=".repeat(50)}\n`;
      text += `SCENARIO ${scenario.num}\n`;
      text += `${"=".repeat(50)}\n\n`;
      text += `Prompt:\n${stripHtml(scenario.prompt)}\n\n`;
      scenario.questions.forEach((q) => {
        text += `Q${q.num}: ${stripHtml(q.text)}\n\n`;
        const answer = responses[getKey(scenario.num, q.num)] || "(No response)";
        text += `Your Answer:\n${answer}\n\n`;
        text += "-".repeat(40) + "\n\n";
      });
    });

    downloadText(`${setTitle.replace(/\s+/g, "_")}_All_Responses.txt`, text);
  }

  const hasAnyResponse = scenarios.some((s) =>
    s.questions.some((q) => (responses[getKey(s.num, q.num)] || "").trim())
  );

  return (
    <div>
      {/* Disclaimer */}
      <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <p className="font-body text-[13px] font-semibold text-amber-900 mb-1">
              Your responses are stored temporarily
            </p>
            <p className="font-body text-[13px] text-amber-800 leading-relaxed">
              Your typed answers will be kept as you navigate between lessons,
              but <b>will be lost if you close or refresh the page</b>. Use the
              download buttons to save your work locally before leaving.
            </p>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      {scenarios.map((scenario) => (
        <div
          key={scenario.num}
          className="mb-8 rounded-xl border border-surface-border bg-white p-5 md:p-6 shadow-sm"
        >
          {/* Scenario header + download button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-[17px] font-bold text-ink">
              Scenario {scenario.num}
            </h3>
            <button
              onClick={() => downloadScenario(scenario)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-body font-semibold text-brand-blue bg-brand-blue-light hover:bg-blue-100 transition-colors cursor-pointer border-none"
              title="Download this scenario's responses"
            >
              <DownloadIcon size={14} />
              Save
            </button>
          </div>

          {/* Prompt card */}
          <div className="mb-5 rounded-lg bg-surface-cream px-4 py-3 border border-surface-border">
            <p className="font-mono text-[10px] text-ink-muted font-bold tracking-[1.5px] uppercase mb-1.5">
              Prompt
            </p>
            <p className="font-body text-[14px] text-ink-soft leading-relaxed">
              <RichText html={scenario.prompt} />
            </p>
          </div>

          {/* Questions with textareas */}
          {scenario.questions.map((q) => (
            <div key={q.num} className="mb-5 last:mb-0">
              <label className="block mb-2">
                <span className="font-body text-[14px] font-semibold text-ink">
                  Q{q.num}:{" "}
                </span>
                <span className="font-body text-[14px] text-ink-soft">
                  <RichText html={q.text} />
                </span>
              </label>
              <textarea
                value={responses[getKey(scenario.num, q.num)] || ""}
                onChange={(e) =>
                  handleChange(scenario.num, q.num, e.target.value)
                }
                placeholder="Type your response here..."
                rows={6}
                className="w-full rounded-lg border border-surface-border bg-surface-cream px-4 py-3 font-body text-[14px] text-ink leading-relaxed placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-y"
              />
            </div>
          ))}
        </div>
      ))}

      {/* Download all button */}
      {scenarios.length > 0 && (
        <div className="mt-8 mb-4 flex justify-center">
          <button
            onClick={downloadAll}
            disabled={!hasAnyResponse}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-[14px] transition-all border-none ${
              hasAnyResponse
                ? "bg-brand-blue text-white hover:brightness-110 shadow-md cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <DownloadIcon size={18} />
            Download All Responses — {setTitle}
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/*  MAIN COURSE PAGE                                        */
/* ══════════════════════════════════════════════════════════ */

export default function CourseLearnPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  /* Practice responses persist across lesson navigation (lost on page close/refresh) */
  const [practiceResponses, setPracticeResponses] = useState({});

  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login?redirect=/course/learn");
        return;
      }

      setUser(user);

      const { data: profile } = await supabase
        .from("profiles")
        .select("has_access, access_expires_at")
        .eq("id", user.id)
        .single();

      if (profile?.has_access && profile?.access_expires_at) {
        const expires = new Date(profile.access_expires_at);
        if (expires > new Date()) {
          setHasAccess(true);
        }
      }

      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("module_num, lesson_num")
        .eq("user_id", user.id)
        .eq("completed", true);

      if (progress) {
        const completed = new Set(
          progress.map((p) => `${p.module_num}-${p.lesson_num}`)
        );
        setCompletedLessons(completed);
      }

      setLoading(false);
    }

    checkAccess();
  }, [router]);

  async function markComplete(modNum, lesNum) {
    const key = `${modNum}-${lesNum}`;
    if (completedLessons.has(key)) return;

    const supabase = createClient();
    const { error } = await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        module_num: modNum,
        lesson_num: lesNum,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_num,lesson_num" }
    );

    if (!error) {
      setCompletedLessons((prev) => new Set([...prev, key]));
    }
  }

  function goToNext() {
    const currentMod = COURSE_CONTENT.find((m) => m.num === activeModule);
    if (!currentMod) return;
    if (activeLesson < currentMod.lessons.length) {
      setActiveLesson(activeLesson + 1);
    } else if (activeModule < COURSE_CONTENT.length) {
      setActiveModule(activeModule + 1);
      setActiveLesson(1);
    }
    window.scrollTo(0, 0);
  }

  function goToPrev() {
    if (activeLesson > 1) {
      setActiveLesson(activeLesson - 1);
    } else if (activeModule > 1) {
      const prevMod = COURSE_CONTENT.find((m) => m.num === activeModule - 1);
      setActiveModule(activeModule - 1);
      setActiveLesson(prevMod ? prevMod.lessons.length : 1);
    }
    window.scrollTo(0, 0);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center">
        <p className="font-body text-sm text-ink-muted">Loading course...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <IconLock size={40} className="text-brand-blue mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-ink mb-3">
            Course Access Required
          </h1>
          <p className="font-body text-sm text-ink-muted mb-6">
            Enroll in the CASPer Expert Strategy Course to access all 7 modules.
          </p>
          <Btn variant="primary" size="md" href="/checkout">
            Enroll Now — $249 CAD
          </Btn>
          <div className="mt-3">
            <Link
              href="/course"
              className="text-sm text-brand-blue font-body no-underline hover:underline"
            >
              Preview free content →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentModule = COURSE_CONTENT.find((m) => m.num === activeModule);
  const currentLesson = currentModule?.lessons.find(
    (l) => l.num === activeLesson
  );
  const totalLessons = COURSE_CONTENT.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );
  const completedCount = completedLessons.size;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const isFirstLesson = activeModule === 1 && activeLesson === 1;
  const isLastLesson =
    activeModule === COURSE_CONTENT.length &&
    activeLesson === currentModule?.lessons.length;
  const isInteractivePractice = isPracticeSet(currentLesson);

  return (
    <div className="min-h-screen bg-surface-cream">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-border h-[56px] flex items-center px-4 md:px-6">
        <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden flex flex-col gap-1 p-2"
            >
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-4 h-0.5 bg-ink" />
              ))}
            </button>
            <Link href="/dashboard" className="no-underline">
              <BrandMark scrolled={true} />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-surface-border overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-orange transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[11px] text-ink-muted font-mono">
                {completedCount}/{totalLessons}
              </span>
            </div>
            <Link
              href="/dashboard"
              className="text-[13px] text-ink-soft font-body no-underline hover:text-ink"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-[56px] flex">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-[56px] left-0 h-[calc(100vh-56px)] w-[280px] bg-white border-r border-surface-border overflow-y-auto z-40 transition-transform ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4">
            {COURSE_CONTENT.map((mod) => (
              <div key={mod.num} className="mb-3">
                <button
                  onClick={() => {
                    setActiveModule(mod.num);
                    setActiveLesson(1);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-[12px] font-bold font-body tracking-[0.5px] uppercase transition-colors ${
                    activeModule === mod.num
                      ? "bg-brand-blue-light text-brand-blue"
                      : "text-ink-muted hover:bg-gray-50"
                  }`}
                >
                  M{mod.num}: {mod.title}
                </button>

                {activeModule === mod.num && (
                  <div className="mt-1 ml-2">
                    {mod.lessons.map((les) => {
                      const isComplete = completedLessons.has(
                        `${mod.num}-${les.num}`
                      );
                      const isActive =
                        activeModule === mod.num && activeLesson === les.num;

                      return (
                        <button
                          key={les.num}
                          onClick={() => {
                            setActiveLesson(les.num);
                            setSidebarOpen(false);
                          }}
                          className={`w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-body transition-colors ${
                            isActive
                              ? "bg-brand-orange-light text-ink font-semibold"
                              : "text-ink-soft hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                              isComplete
                                ? "bg-green-500"
                                : isActive
                                ? "bg-brand-orange"
                                : "bg-surface-border"
                            }`}
                          >
                            {isComplete && (
                              <IconCheck size={10} className="text-white" />
                            )}
                          </div>
                          <span className="truncate">{les.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-[720px] mx-auto">
            {/* Lesson banner image */}
            {currentLesson?.image && (
              <div className="mb-6 rounded-xl overflow-hidden border border-surface-border">
                <img
                  src={currentLesson.image}
                  alt={currentLesson.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Module/lesson header */}
            <div className="mb-6">
              <p className="font-mono text-[11px] text-brand-orange font-bold tracking-[2px] uppercase mb-1.5">
                Module {activeModule} &middot; Lesson {activeLesson}
              </p>
              <h1 className="font-display text-[24px] md:text-[28px] font-bold text-ink leading-tight">
                {currentLesson?.title}
              </h1>
            </div>

            {/* Video embed for video lessons */}
            {currentLesson?.type === "video" && currentLesson?.videoId && (
              <div className="mb-8">
                <VideoThumbnail
                  title={currentLesson.title}
                  videoId={currentLesson.videoId}
                  subtitle={`Module ${activeModule} — Tutorial`}
                />
              </div>
            )}

            {/* ─── Interactive Practice Set ─── */}
            {isInteractivePractice ? (
              <PracticeSetView
                lesson={currentLesson}
                moduleNum={activeModule}
                responses={practiceResponses}
                setResponses={setPracticeResponses}
              />
            ) : (
              /* ─── Standard Lesson Content ─── */
              <div className="prose-lesson">
                {currentLesson?.content
                  .split("\n")
                  .map((line, i) => {
                    const trimmed = line.trimStart();

                    if (trimmed === "") return null;

                    if (trimmed.startsWith("## ")) {
                      return (
                        <h2 key={i} className="font-display text-xl font-bold text-ink mt-8 mb-3">
                          {trimmed.replace("## ", "")}
                        </h2>
                      );
                    }

                    if (trimmed.startsWith("### ")) {
                      return (
                        <h3 key={i} className="font-body text-[15px] font-bold text-ink mt-7 mb-2">
                          {trimmed.replace("### ", "")}
                        </h3>
                      );
                    }

                    if (trimmed.startsWith("> ")) {
                      return (
                        <blockquote key={i} className="border-l-3 border-brand-orange pl-4 my-4 text-[14px] text-ink-soft italic font-body leading-relaxed bg-brand-orange-light/30 py-3 pr-4 rounded-r-lg">
                          <RichText html={trimmed.replace("> ", "")} />
                        </blockquote>
                      );
                    }

                    if (trimmed.startsWith("---")) {
                      return <hr key={i} className="my-6 border-surface-border" />;
                    }

                    if (trimmed.startsWith("- [ ] ")) {
                      return (
                        <div key={i} className="flex items-start gap-2 mb-1">
                          <span className="mt-1 w-4 h-4 rounded border border-surface-border inline-block shrink-0" />
                          <span className="font-body text-[14px] text-ink-soft">
                            <RichText html={trimmed.replace("- [ ] ", "")} />
                          </span>
                        </div>
                      );
                    }

                    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                      return (
                        <div key={i} className="flex items-start gap-2.5 mb-1.5 ml-1">
                          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                          <span className="font-body text-[14px] text-ink-soft leading-relaxed">
                            <RichText html={trimmed.replace(/^[-*] /, "")} />
                          </span>
                        </div>
                      );
                    }

                    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
                      return (
                        <p key={i} className="font-mono text-[12px] text-ink-soft mb-0.5">
                          {trimmed}
                        </p>
                      );
                    }

                    if (trimmed.startsWith("✅") || trimmed.startsWith("❌")) {
                      return (
                        <p key={i} className="font-body text-[14px] text-ink-soft mb-1">
                          <RichText html={trimmed} />
                        </p>
                      );
                    }

                    return (
                      <p key={i} className="font-body text-[14px] text-ink-soft leading-[1.8] mb-3">
                        <RichText html={trimmed} />
                      </p>
                    );
                  })}
              </div>
            )}

            {/* Bottom actions */}
            <div className="mt-10 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {!isFirstLesson && (
                  <button
                    onClick={goToPrev}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-cream border border-surface-border text-ink-soft font-body font-semibold text-[14px] hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    ← Previous
                  </button>
                )}
                <button
                  onClick={() => markComplete(activeModule, activeLesson)}
                  className={`px-5 py-2.5 rounded-lg font-body font-semibold text-[14px] transition-all ${
                    completedLessons.has(`${activeModule}-${activeLesson}`)
                      ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                      : "bg-brand-blue text-white hover:brightness-110 cursor-pointer border-none"
                  }`}
                >
                  {completedLessons.has(`${activeModule}-${activeLesson}`)
                    ? "✓ Completed"
                    : "Mark as Complete"}
                </button>
              </div>

              {!isLastLesson && (
                <button
                  onClick={goToNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange text-white font-body font-semibold text-[14px] hover:brightness-110 transition-all cursor-pointer border-none"
                >
                  Next Lesson <IconArrow size={14} />
                </button>
              )}

              {isLastLesson && (
                <div className="text-center">
                  <p className="font-body text-sm font-semibold text-green-700">
                    🎉 You&apos;ve completed the entire course!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}