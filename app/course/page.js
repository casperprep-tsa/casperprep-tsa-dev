"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MODULES, TUTORIALS, PLANS } from "@/lib/constants";
import { Badge, Btn } from "@/components/ui/Primitives";
import { IconLock, IconCheck, IconLightbulb } from "@/components/Icons";
import VideoThumbnail from "@/components/VideoThumbnail";

export default function CoursePage() {
  var router = useRouter();
  var ref1 = useState(null);
  var user = ref1[0], setUser = ref1[1];
  var ref2 = useState(true);
  var loading = ref2[0], setLoading = ref2[1];
  var ref3 = useState(4);
  var activeModule = ref3[0], setActiveModule = ref3[1];

  useEffect(function () {
    async function checkAuth() {
      var supabase = createClient();
      var result = await supabase.auth.getUser();
      if (!result.data.user) {
        router.push("/auth/login?redirect=/course");
        return;
      }
      setUser(result.data.user);

      /* If user has any paid access, redirect to the full course view */
      var profileResult = await supabase
        .from("profiles")
        .select("has_strategy, has_question_bank, access_expires_at")
        .eq("id", result.data.user.id)
        .single();

      var profile = profileResult.data;
      if (profile && profile.access_expires_at) {
        var expires = new Date(profile.access_expires_at);
        if (expires > new Date() && (profile.has_strategy || profile.has_question_bank)) {
          /* Redirect to the first module they have access to */
          if (profile.has_strategy) {
            router.push("/course/learn?m=1&l=1");
          } else {
            router.push("/course/learn?m=6&l=1");
          }
          return;
        }
      }

      setLoading(false);
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center">
        <p className="font-body text-sm text-ink-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-blue-deep to-brand-blue pt-[130px] pb-[50px] px-6">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center gap-2.5 mb-4">
            <Badge variant="orange">Version 2.0</Badge>
            <Badge variant="blue">Free Preview</Badge>
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

            {MODULES.map(function (m) {
              var isFree = m.num === 4;
              var active = activeModule === m.num;
              return (
                <div
                  key={m.num}
                  onClick={function () { setActiveModule(m.num); }}
                  className={"flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-all " + (active ? "bg-brand-blue-light border border-brand-blue" : "border border-transparent hover:bg-gray-50") + (!isFree && !active ? " opacity-50" : "")}
                >
                  <div
                    className={"w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold font-body shrink-0 " + (active ? "bg-brand-blue text-white" : "bg-surface-border-light text-ink-muted")}
                  >
                    {isFree ? (
                      m.num
                    ) : (
                      <IconLock size={12} className={active ? "text-white" : "text-ink-muted"} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={"font-body text-[13px] truncate " + (active ? "font-semibold text-ink" : "text-ink-soft")}>
                      {m.title}
                    </p>
                    <p className="text-[11px] text-ink-muted font-body">
                      {isFree ? (
                        <span className="text-green-600 font-semibold">Free Preview</span>
                      ) : (
                        "Locked"
                      )}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-surface-border mt-4 pt-4">
              <Btn variant="primary" size="sm" full href="/checkout?plan=full">
                Unlock Full Course
              </Btn>
              <p className="text-[11px] text-ink-muted text-center mt-2 font-body">
                From ${PLANS.question_bank.price} CAD &middot; One-time
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
                      Module 4 &middot; 3 Sessions &middot; Free Preview
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-ink-muted leading-relaxed mb-8 mt-2">
                  Watch expert breakdowns of real CASPer scenario strategies. Each tutorial
                  covers a different critical skill that evaluators look for in top-quartile
                  responses.
                </p>

                {TUTORIALS.map(function (tut, i) {
                  return (
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
                        subtitle={"Tutorial " + tut.num}
                      />
                      {i < TUTORIALS.length - 1 && (
                        <div className="h-px bg-surface-border mt-7" />
                      )}
                    </div>
                  );
                })}

                {/* Upsell after free content */}
                <div className="mt-10 pt-6 border-t border-surface-border text-center">
                  <p className="font-body text-[15px] font-semibold text-ink mb-2">
                    Ready to go deeper?
                  </p>
                  <p className="font-body text-[13px] text-ink-muted mb-5 max-w-md mx-auto">
                    Get the frameworks, practice scenarios, and expert answer keys you need to score in the top quartile.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Btn variant="primary" size="md" href="/checkout?plan=full">
                      Full Course — ${PLANS.full.price} CAD
                    </Btn>
                    <Btn variant="secondary" size="md" href="/checkout?plan=strategy">
                      Strategy Only — ${PLANS.strategy.price} CAD
                    </Btn>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-surface-border p-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-brand-blue-light flex items-center justify-center mx-auto mb-5">
                  <IconLock size={28} className="text-brand-blue" />
                </div>
                <h2 className="font-display text-xl md:text-[22px] font-bold text-ink mb-2">
                  Module {activeModule}:{" "}
                  {MODULES.find(function (m) { return m.num === activeModule; })?.title}
                </h2>
                <p className="font-body text-sm text-ink-muted leading-relaxed max-w-[400px] mx-auto mb-6">
                  {activeModule <= 5
                    ? "This module is part of the Strategy Course. Unlock Modules 1-5 with frameworks, expert videos, and the ideas bank."
                    : "This module is part of the Question Bank. Unlock Modules 6-7 with 20+ practice scenarios and self-evaluation tools."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Btn variant="primary" size="md" href="/checkout?plan=full">
                    Full Course — ${PLANS.full.price} CAD
                  </Btn>
                  {activeModule <= 5 ? (
                    <Btn variant="secondary" size="md" href="/checkout?plan=strategy">
                      Strategy Only — ${PLANS.strategy.price} CAD
                    </Btn>
                  ) : (
                    <Btn variant="secondary" size="md" href="/checkout?plan=question_bank">
                      Question Bank — ${PLANS.question_bank.price} CAD
                    </Btn>
                  )}
                </div>
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