"use client";
import { useState } from "react";
import { MODULES, TUTORIALS } from "@/lib/constants";
import { Badge, Btn } from "@/components/ui/Primitives";
import { IconLock, IconCheck, IconLightbulb } from "@/components/Icons";
import VideoThumbnail from "@/components/VideoThumbnail";

export default function CoursePage() {
  const [activeModule, setActiveModule] = useState(4);

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[130px] pb-[50px] px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <Badge variant="orange">Version 2.0</Badge>
            <Badge variant="blue">Course Preview</Badge>
          </div>
          <h1 className="font-display text-[30px] md:text-[32px] font-bold text-white leading-tight mb-2">
            CASPer Expert Strategy Course
          </h1>
          <p className="font-body text-[15px] text-white/60 leading-relaxed max-w-[500px]">
            7 modules &middot; Expert video tutorials &middot; Practice scenarios with sample
            answers
          </p>
        </div>
      </section>

      {/* Course Layout */}
      <section className="bg-surface-cream px-6 pb-20">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 -mt-5">
          {/* Sidebar */}
          <div className="bg-white rounded-xl border border-surface-border p-5 self-start md:sticky md:top-[90px]">
            <h3 className="font-body text-[13px] font-bold text-ink-muted tracking-[1px] uppercase mb-4">
              Course Modules
            </h3>

            {MODULES.map((m) => {
              const locked = m.num !== 4;
              const active = activeModule === m.num;
              return (
                <div
                  key={m.num}
                  onClick={() => setActiveModule(m.num)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-all ${
                    active
                      ? "bg-brand-blue-light border border-brand-blue"
                      : "border border-transparent hover:bg-gray-50"
                  } ${locked && !active ? "opacity-50" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold font-body shrink-0 ${
                      active ? "bg-brand-blue text-white" : "bg-surface-border-light text-ink-muted"
                    }`}
                  >
                    {locked ? (
                      <IconLock size={12} className={active ? "text-white" : "text-ink-muted"} />
                    ) : (
                      m.num
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-body text-[13px] truncate ${
                        active ? "font-semibold text-ink" : "text-ink-soft"
                      }`}
                    >
                      {m.title}
                    </p>
                    <p className="text-[11px] text-ink-muted font-body">
                      {locked && m.num !== activeModule ? "Locked" : `${m.lessons} lessons`}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-surface-border mt-4 pt-4">
              <Btn variant="primary" size="sm" full href="/checkout">
                Unlock Full Course
              </Btn>
              <p className="text-[11px] text-ink-muted text-center mt-2 font-body">
                $249 CAD &middot; One-time
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {activeModule === 4 ? (
              <div className="bg-white rounded-xl border border-surface-border p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center font-display font-bold text-white text-lg">
                    4
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-[22px] font-bold text-ink">
                      Expert-Led Video Analysis Tutorials
                    </h2>
                    <p className="text-[12px] text-ink-muted font-body">
                      Module 4 &middot; 3 Sessions &middot; Video
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 mt-2">
                  Watch expert breakdowns of real CASPer scenario strategies. Each tutorial
                  covers a different critical skill that evaluators look for in top-quartile
                  responses.
                </p>

                {TUTORIALS.map((tut, i) => (
                  <div key={tut.num} className={i < TUTORIALS.length - 1 ? "mb-9" : ""}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-7 h-7 rounded-md bg-brand-orange-light flex items-center justify-center font-body font-bold text-brand-orange-dark text-[13px]">
                        {tut.num}
                      </div>
                      <h3 className="font-body text-base font-semibold text-ink">
                        Tutorial {tut.num}: {tut.title}
                      </h3>
                    </div>
                    <p className="font-body text-[13px] text-ink-muted leading-relaxed mb-3.5">
                      {tut.desc}
                    </p>
                    <VideoThumbnail
                      title={tut.title}
                      videoId={tut.videoId}
                      subtitle={`Tutorial ${tut.num}`}
                    />
                    {i < TUTORIALS.length - 1 && (
                      <div className="h-px bg-surface-border mt-7" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-surface-border p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue-light flex items-center justify-center mx-auto mb-5">
                  <IconLock size={28} className="text-brand-blue" />
                </div>
                <h2 className="font-display text-xl md:text-[22px] font-bold text-ink mb-2">
                  Module {activeModule}:{" "}
                  {MODULES.find((m) => m.num === activeModule)?.title}
                </h2>
                <p className="font-body text-sm text-ink-muted leading-relaxed max-w-[400px] mx-auto mb-6">
                  This module is available when you enroll in the full course. Get instant
                  access to all 7 modules, expert video tutorials, practice scenarios, and the
                  ideas bank.
                </p>
                <Btn variant="primary" size="md" href="/checkout">
                  Enroll to Unlock — $249 CAD
                </Btn>
              </div>
            )}

            {/* Info note */}
            <div className="mt-5 px-6 py-5 bg-white rounded-[10px] border border-surface-border flex items-start gap-3">
              <IconLightbulb size={18} className="text-brand-orange shrink-0 mt-0.5" />
              <p className="font-body text-[13px] text-ink-soft leading-snug">
                This is a preview of the course structure. Enrolled students can track their
                progress, access all modules, and work through the course at their own pace.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
