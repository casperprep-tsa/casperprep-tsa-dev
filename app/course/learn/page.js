"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { jsPDF } from "jspdf";
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

/* ── Check if a lesson is an interactive practice set (Module 6) ── */
function isPracticeSet(lesson) {
  if (!lesson) return false;
  var t = lesson.title.toLowerCase();
  return t.includes("practice set") && !t.includes("answer key");
}

/* ── Parse practice set content into structured scenarios ── */
function parsePracticeScenarios(content) {
  var scenarios = [];
  var lines = content.split("\n");
  var current = null;
  var promptLines = [];
  var lastQ = null;

  for (var i = 0; i < lines.length; i++) {
    var trimmed = lines[i].trim();
    if (!trimmed) continue;
    if (/^### Practice Set \d+$/.test(trimmed)) continue;

    var scenarioMatch = trimmed.match(/^### Scenario (\d+)/);
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

    var qMatch = trimmed.match(/^-?\s*Q(\d+)\s*[:\s]\s*(.+)$/);
    if (qMatch) {
      lastQ = { num: parseInt(qMatch[1]), text: qMatch[2].trim() };
      current.questions.push(lastQ);
      continue;
    }

    if (lastQ && !trimmed.startsWith("### ") && !trimmed.match(/^-?\s*Q\d+/)) {
      lastQ.text += " " + trimmed;
      continue;
    }

    if (trimmed === "Prompt:" || trimmed === "Prompt") {
      lastQ = null;
      continue;
    }

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

/* ── PDF Download helper ── */
function downloadPDF(filename, title, sections) {
  /* sections = [{ heading, body }] or [{ heading, body, type:"table", columns, rows }] */
  var doc = new jsPDF({ unit: "mm", format: "letter" });
  var pageW = doc.internal.pageSize.getWidth();
  var margin = 18;
  var usable = pageW - margin * 2;
  var y = margin;

  function checkPage(needed) {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  }

  /* Title */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  var titleLines = doc.splitTextToSize(title, usable);
  checkPage(titleLines.length * 8 + 6);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 2;

  /* Date */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("Downloaded: " + new Date().toLocaleString(), margin, y);
  doc.setTextColor(0);
  y += 8;

  /* Divider */
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 6;

  sections.forEach(function (section) {
    if (section.type === "divider") {
      checkPage(8);
      doc.setDrawColor(180);
      doc.line(margin, y, pageW - margin, y);
      y += 6;
      return;
    }

    /* Section heading */
    if (section.heading) {
      checkPage(14);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      var headLines = doc.splitTextToSize(section.heading, usable);
      doc.text(headLines, margin, y);
      y += headLines.length * 6 + 3;
    }

    /* Table rendering */
    if (section.type === "table" && section.columns && section.tableData) {
      var cols = section.columns;
      var colW = usable / cols.length;
      checkPage(8 + section.tableData.length * 7);

      /* Header */
      doc.setFillColor(235, 240, 250);
      doc.rect(margin, y - 4, usable, 7, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      cols.forEach(function (col, ci) {
        doc.text(col, margin + ci * colW + 2, y);
      });
      y += 5;

      /* Rows */
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      section.tableData.forEach(function (row) {
        checkPage(7);
        doc.setDrawColor(220);
        doc.line(margin, y - 3, pageW - margin, y - 3);
        row.forEach(function (cell, ci) {
          doc.text(String(cell || "—"), margin + ci * colW + 2, y);
        });
        y += 6;
      });
      y += 4;
      return;
    }

    /* Body text */
    if (section.body) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      var bodyLines = doc.splitTextToSize(String(section.body), usable);
      bodyLines.forEach(function (line) {
        checkPage(6);
        doc.text(line, margin, y);
        y += 5;
      });
      y += 4;
    }
  });

  doc.save(filename.replace(/\.txt$/, ".pdf"));
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, "");
}

function DownloadIcon({ size }) {
  return (
    <svg width={size || 14} height={size || 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

/* ── Video/Written scenario mapping per practice set ── */
/* true = video response, false = written response */
var VIDEO_SCENARIO_MAP = {
  "Practice Set 1": { 1: false, 2: false, 3: false, 4: true, 5: true },
  "Practice Set 2": { 1: true, 2: true, 3: false, 4: false, 5: false },
  "Practice Set 3": { 1: false, 2: false, 3: true, 4: true, 5: false },
  "Practice Set 4": { 1: false, 2: true, 3: true, 4: false, 5: false },
};

function isVideoScenario(lessonTitle, scenarioNum) {
  var setName = Object.keys(VIDEO_SCENARIO_MAP).find(function (k) {
    return lessonTitle.indexOf(k) !== -1;
  });
  if (!setName) return false;
  return VIDEO_SCENARIO_MAP[setName][scenarioNum] || false;
}


/* ════════════════════════════════════════════════════════════ */
/*  COUNTDOWN TIMER                                            */
/* ════════════════════════════════════════════════════════════ */

function PracticeTimer() {
  var ref = useState(5);
  var inputMin = ref[0], setInputMin = ref[1];
  var ref2 = useState(0);
  var inputSec = ref2[0], setInputSec = ref2[1];
  var ref3 = useState(null);
  var remaining = ref3[0], setRemaining = ref3[1];
  var ref4 = useState(false);
  var running = ref4[0], setRunning = ref4[1];
  var ref5 = useState(false);
  var finished = ref5[0], setFinished = ref5[1];
  var intervalRef = useRef(null);
  var totalRef = useRef(0);

  useEffect(function () {
    return function () {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(function () {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(function () {
        setRemaining(function (prev) {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setFinished(true);
            playAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return function () {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

  function playAlarm() {
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.3, 0.6].forEach(function (delay) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.type = "sine";
        gain.gain.value = 0.3;
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + 0.2);
      });
    } catch (e) { /* silent */ }
  }

  function startTimer() {
    var total = inputMin * 60 + inputSec;
    if (total <= 0) return;
    totalRef.current = total;
    setRemaining(total);
    setRunning(true);
    setFinished(false);
  }

  function pauseTimer() { setRunning(false); }
  function resumeTimer() { if (remaining > 0) setRunning(true); }
  function resetTimer() {
    setRunning(false);
    setRemaining(null);
    setFinished(false);
  }

  function formatTime(s) {
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  var isActive = remaining !== null;
  var pct = isActive && totalRef.current > 0 ? ((totalRef.current - remaining) / totalRef.current) * 100 : 0;

  return (
    <div className={"mb-6 rounded-xl border px-5 py-4 " + (finished ? "border-red-400 bg-red-50" : "border-brand-blue/20 bg-brand-blue-light/40")}>
      <div className="flex items-center gap-2 mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={finished ? "text-red-500" : "text-brand-blue"}>
          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
        <span className={"font-body text-[13px] font-semibold " + (finished ? "text-red-700" : "text-brand-blue")}>
          {finished ? "⏰ Time's Up!" : "Practice Timer"}
        </span>
      </div>

      {!isActive && (
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <input type="number" min="0" max="99" value={inputMin} onChange={function (e) { setInputMin(Math.max(0, parseInt(e.target.value) || 0)); }}
              className="w-14 rounded-lg border border-surface-border bg-white px-2 py-1.5 font-mono text-center text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/30" />
            <span className="text-[12px] text-ink-muted font-body">min</span>
          </div>
          <div className="flex items-center gap-1">
            <input type="number" min="0" max="59" value={inputSec} onChange={function (e) { setInputSec(Math.max(0, Math.min(59, parseInt(e.target.value) || 0))); }}
              className="w-14 rounded-lg border border-surface-border bg-white px-2 py-1.5 font-mono text-center text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-brand-blue/30" />
            <span className="text-[12px] text-ink-muted font-body">sec</span>
          </div>
          <button onClick={startTimer} className="ml-2 px-4 py-1.5 rounded-lg bg-brand-blue text-white text-[13px] font-body font-semibold hover:brightness-110 transition-all cursor-pointer border-none">
            Start Timer
          </button>
        </div>
      )}

      {isActive && (
        <div>
          {/* Progress bar */}
          <div className="h-2 rounded-full bg-gray-200 mb-3 overflow-hidden">
            <div className={"h-full rounded-full transition-all duration-1000 " + (finished ? "bg-red-500" : remaining < 30 ? "bg-amber-500" : "bg-brand-blue")}
              style={{ width: Math.min(pct, 100) + "%" }} />
          </div>
          <div className="flex items-center justify-between">
            <span className={"font-mono text-[28px] font-bold " + (finished ? "text-red-600" : remaining < 30 ? "text-amber-600" : "text-ink")}>
              {formatTime(remaining)}
            </span>
            <div className="flex gap-2">
              {running && (
                <button onClick={pauseTimer} className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-[12px] font-body font-semibold hover:bg-amber-200 transition-colors cursor-pointer border-none">
                  Pause
                </button>
              )}
              {!running && remaining > 0 && !finished && (
                <button onClick={resumeTimer} className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-[12px] font-body font-semibold hover:bg-green-200 transition-colors cursor-pointer border-none">
                  Resume
                </button>
              )}
              <button onClick={resetTimer} className="px-3 py-1.5 rounded-lg bg-gray-100 text-ink-muted text-[12px] font-body font-semibold hover:bg-gray-200 transition-colors cursor-pointer border-none">
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ════════════════════════════════════════════════════════════ */
/*  VIDEO RECORDER                                             */
/* ════════════════════════════════════════════════════════════ */

function VideoRecorder({ recordingKey, recordings, setRecordings }) {
  var ref1 = useState(false);
  var isRecording = ref1[0], setIsRecording = ref1[1];
  var ref2 = useState(null);
  var mediaRecorder = ref2[0], setMediaRecorder = ref2[1];
  var ref3 = useState(null);
  var stream = ref3[0], setStream = ref3[1];
  var ref4 = useState(null);
  var error = ref4[0], setError = ref4[1];
  var ref5 = useState(null);
  var previewStream = ref5[0], setPreviewStream = ref5[1];
  var videoPreviewRef = useRef(null);
  var chunksRef = useRef([]);

  var existing = recordings[recordingKey] || null;

  function startRecording() {
    setError(null);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(function (s) {
        setStream(s);
        setPreviewStream(s);
        chunksRef.current = [];
        var mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
          ? "video/webm;codecs=vp9,opus"
          : MediaRecorder.isTypeSupported("video/webm")
          ? "video/webm"
          : "video/mp4";
        var mr = new MediaRecorder(s, { mimeType: mimeType });
        mr.ondataavailable = function (e) {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        mr.onstop = function () {
          var blob = new Blob(chunksRef.current, { type: mimeType });
          var url = URL.createObjectURL(blob);
          setRecordings(function (prev) {
            var next = Object.assign({}, prev);
            next[recordingKey] = { blob: blob, url: url, mimeType: mimeType };
            return next;
          });
          s.getTracks().forEach(function (t) { t.stop(); });
          setStream(null);
          setPreviewStream(null);
        };
        mr.start(1000);
        setMediaRecorder(mr);
        setIsRecording(true);
      })
      .catch(function (err) {
        setError("Camera access denied. Please allow camera and microphone access to record video responses.");
      });
  }

  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  }

  function deleteRecording() {
    if (existing && existing.url) URL.revokeObjectURL(existing.url);
    setRecordings(function (prev) {
      var next = Object.assign({}, prev);
      delete next[recordingKey];
      return next;
    });
  }

  function downloadRecording() {
    if (!existing) return;
    var a = document.createElement("a");
    a.href = existing.url;
    a.download = recordingKey.replace(/[^a-zA-Z0-9-_]/g, "_") + ".webm";
    a.click();
  }

  /* Live preview */
  useEffect(function () {
    if (previewStream && videoPreviewRef.current) {
      videoPreviewRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  return (
    <div className="rounded-lg border border-surface-border bg-surface-cream p-4">
      {error && (
        <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
          <p className="font-body text-[12px] text-red-700">{error}</p>
        </div>
      )}

      {/* Live preview while recording */}
      {isRecording && (
        <div className="mb-3 relative">
          <video
            ref={function (el) { videoPreviewRef.current = el; if (el && previewStream) el.srcObject = previewStream; }}
            autoPlay muted playsInline
            className="w-full rounded-lg bg-black aspect-video object-cover"
          />
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="text-[11px] font-body font-bold">RECORDING</span>
          </div>
        </div>
      )}

      {/* Playback of recorded video */}
      {!isRecording && existing && (
        <div className="mb-3">
          <video src={existing.url} controls playsInline className="w-full rounded-lg bg-black aspect-video" />
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        {!isRecording && !existing && (
          <button onClick={startRecording} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-[13px] font-body font-semibold hover:bg-red-600 transition-colors cursor-pointer border-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7" /></svg>
            Start Recording
          </button>
        )}
        {isRecording && (
          <button onClick={stopRecording} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white text-[13px] font-body font-semibold hover:bg-gray-900 transition-colors cursor-pointer border-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
            Stop Recording
          </button>
        )}
        {!isRecording && existing && (
          <>
            <button onClick={startRecording} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white text-[12px] font-body font-semibold hover:bg-red-600 transition-colors cursor-pointer border-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="7" /></svg>
              Re-record
            </button>
            <button onClick={downloadRecording} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-blue-light text-brand-blue text-[12px] font-body font-semibold hover:bg-blue-100 transition-colors cursor-pointer border-none">
              <DownloadIcon size={12} /> Download Video
            </button>
            <button onClick={deleteRecording} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-ink-muted text-[12px] font-body font-semibold hover:bg-gray-200 transition-colors cursor-pointer border-none">
              Delete
            </button>
          </>
        )}
      </div>

      {!existing && !isRecording && (
        <p className="mt-2 font-body text-[11px] text-ink-muted">
          Click to record your video response. Ensure your camera and microphone are enabled.
        </p>
      )}
    </div>
  );
}


/* ════════════════════════════════════════════════════════════ */
/*  DISCLAIMER                                                 */
/* ════════════════════════════════════════════════════════════ */

function Disclaimer() {
  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4">
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5">⚠️</span>
        <div>
          <p className="font-body text-[13px] font-semibold text-amber-900 mb-1">
            Your responses are stored temporarily
          </p>
          <p className="font-body text-[13px] text-amber-800 leading-relaxed">
            Your typed answers and video recordings will be kept as you navigate
            between lessons, but <b>will be lost if you close or refresh the
            page</b>. Use the download buttons to save your written responses as
            PDF and video recordings before leaving.
          </p>
        </div>
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════ */
/*  PRACTICE SET VIEW (Module 6) — with Timer & Video          */
/* ════════════════════════════════════════════════════════════ */

function PracticeSetView({ lesson, moduleNum, responses, setResponses, recordings, setRecordings }) {
  var scenarios = parsePracticeScenarios(lesson.content);
  var setTitle = lesson.title;

  function getKey(sn, qn) {
    return moduleNum + "-" + lesson.num + "-s" + sn + "-q" + qn;
  }

  function handleChange(sn, qn, value) {
    setResponses(function (prev) {
      var next = Object.assign({}, prev);
      next[getKey(sn, qn)] = value;
      return next;
    });
  }

  function downloadScenario(scenario) {
    var isVideo = isVideoScenario(setTitle, scenario.num);

    if (isVideo) {
      /* Download video files for each question */
      scenario.questions.forEach(function (q) {
        var vKey = getKey(scenario.num, q.num) + "-video";
        var rec = recordings[vKey];
        if (rec && rec.url) {
          var a = document.createElement("a");
          a.href = rec.url;
          a.download = setTitle.replace(/\s+/g, "_") + "_Scenario_" + scenario.num + "_Q" + q.num + ".webm";
          a.click();
        }
      });
      /* Also make a PDF with just the prompts/questions */
      var sections = [];
      sections.push({ heading: "Prompt", body: stripHtml(scenario.prompt) });
      scenario.questions.forEach(function (q) {
        sections.push({ heading: "Q" + q.num + ": " + stripHtml(q.text), body: "(Video response — see downloaded video file)" });
      });
      downloadPDF(
        setTitle.replace(/\s+/g, "_") + "_Scenario_" + scenario.num + "_Questions.pdf",
        setTitle + " — Scenario " + scenario.num + " (Video Response)",
        sections
      );
    } else {
      /* Written — download as PDF */
      var sections = [];
      sections.push({ heading: "Prompt", body: stripHtml(scenario.prompt) });
      scenario.questions.forEach(function (q) {
        sections.push({ heading: "Q" + q.num + ": " + stripHtml(q.text), body: responses[getKey(scenario.num, q.num)] || "(No response)" });
      });
      downloadPDF(
        setTitle.replace(/\s+/g, "_") + "_Scenario_" + scenario.num + ".pdf",
        setTitle + " — Scenario " + scenario.num,
        sections
      );
    }
  }

  function downloadAll() {
    /* Written scenarios → single PDF */
    var writtenSections = [];
    var hasWritten = false;
    scenarios.forEach(function (scenario) {
      if (isVideoScenario(setTitle, scenario.num)) return;
      hasWritten = true;
      writtenSections.push({ type: "divider" });
      writtenSections.push({ heading: "Scenario " + scenario.num });
      writtenSections.push({ heading: "Prompt", body: stripHtml(scenario.prompt) });
      scenario.questions.forEach(function (q) {
        writtenSections.push({ heading: "Q" + q.num + ": " + stripHtml(q.text), body: responses[getKey(scenario.num, q.num)] || "(No response)" });
      });
    });
    if (hasWritten) {
      downloadPDF(
        setTitle.replace(/\s+/g, "_") + "_Written_Responses.pdf",
        setTitle + " — Written Responses",
        writtenSections
      );
    }

    /* Video scenarios → download each video file with Scenario_X_QY naming + a questions PDF */
    var videoSections = [];
    scenarios.forEach(function (scenario) {
      if (!isVideoScenario(setTitle, scenario.num)) return;
      videoSections.push({ type: "divider" });
      videoSections.push({ heading: "Scenario " + scenario.num + " (Video Response)" });
      videoSections.push({ heading: "Prompt", body: stripHtml(scenario.prompt) });
      scenario.questions.forEach(function (q) {
        var vKey = getKey(scenario.num, q.num) + "-video";
        var rec = recordings[vKey];
        var fname = setTitle.replace(/\s+/g, "_") + "_Scenario_" + scenario.num + "_Q" + q.num + ".webm";
        videoSections.push({ heading: "Q" + q.num + ": " + stripHtml(q.text), body: rec ? "(Video response — see " + fname + ")" : "(No video recorded)" });
        if (rec && rec.url) {
          /* Download video immediately in user event chain so browser doesn't block */
          var a = document.createElement("a");
          a.href = rec.url;
          a.download = fname;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    });

    /* Download the video questions PDF */
    if (videoSections.length > 0) {
      downloadPDF(
        setTitle.replace(/\s+/g, "_") + "_Video_Questions.pdf",
        setTitle + " — Video Response Questions",
        videoSections
      );
    }
  }

  var hasAnyWritten = scenarios.some(function (s) {
    if (isVideoScenario(setTitle, s.num)) return false;
    return s.questions.some(function (q) { return (responses[getKey(s.num, q.num)] || "").trim(); });
  });
  var hasAnyVideo = scenarios.some(function (s) {
    if (!isVideoScenario(setTitle, s.num)) return false;
    return s.questions.some(function (q) { return recordings[getKey(s.num, q.num) + "-video"]; });
  });
  var hasAny = hasAnyWritten || hasAnyVideo;

  return (
    <div>
      <Disclaimer />
      {scenarios.map(function (scenario) {
        var isVideo = isVideoScenario(setTitle, scenario.num);
        return (
          <div key={scenario.num} className={"mb-8 rounded-xl border bg-white p-5 md:p-6 shadow-sm " + (isVideo ? "border-red-200" : "border-surface-border")}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-[17px] font-bold text-ink">Scenario {scenario.num}</h3>
                {isVideo ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-[11px] font-body font-semibold text-red-600">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><circle cx="12" cy="12" r="7" /></svg>
                    Video Response
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-body font-semibold text-brand-blue">
                    ✍️ Written Response
                  </span>
                )}
              </div>
              <button onClick={function () { downloadScenario(scenario); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-body font-semibold text-brand-blue bg-brand-blue-light hover:bg-blue-100 transition-colors cursor-pointer border-none">
                <DownloadIcon size={14} /> Save
              </button>
            </div>
            <div className="mb-5 rounded-lg bg-surface-cream px-4 py-3 border border-surface-border">
              <p className="font-mono text-[10px] text-ink-muted font-bold tracking-[1.5px] uppercase mb-1.5">Prompt</p>
              <p className="font-body text-[14px] text-ink-soft leading-relaxed"><RichText html={scenario.prompt} /></p>
            </div>
            <PracticeTimer />
            {scenario.questions.map(function (q) {
              return (
                <div key={q.num} className="mb-5 last:mb-0">
                  <label className="block mb-2">
                    <span className="font-body text-[14px] font-semibold text-ink">Q{q.num}: </span>
                    <span className="font-body text-[14px] text-ink-soft"><RichText html={q.text} /></span>
                  </label>
                  {isVideo ? (
                    <VideoRecorder
                      recordingKey={getKey(scenario.num, q.num) + "-video"}
                      recordings={recordings}
                      setRecordings={setRecordings}
                    />
                  ) : (
                    <textarea
                      value={responses[getKey(scenario.num, q.num)] || ""}
                      onChange={function (e) { handleChange(scenario.num, q.num, e.target.value); }}
                      placeholder="Type your response here..."
                      rows={6}
                      className="w-full rounded-lg border border-surface-border bg-surface-cream px-4 py-3 font-body text-[14px] text-ink leading-relaxed placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-y"
                    />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
      {scenarios.length > 0 && (
        <div className="mt-8 mb-4 flex justify-center">
          <button onClick={downloadAll} disabled={!hasAny} className={"flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-[14px] transition-all border-none " + (hasAny ? "bg-brand-blue text-white hover:brightness-110 shadow-md cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed")}>
            <DownloadIcon size={18} /> Download All Responses — {setTitle}
          </button>
        </div>
      )}
    </div>
  );
}


/* ════════════════════════════════════════════════════════════ */
/*  CONTENT RENDERER (handles normal text + interactive)      */
/*  FIELD:label  → text input                                 */
/*  AREA:label   → textarea                                   */
/*  TABLE:c1|c2|...|rows → editable table                     */
/*  Everything else → normal text rendering                   */
/* ════════════════════════════════════════════════════════════ */

function LessonContentRenderer({ lesson, moduleNum, responses, setResponses }) {
  if (!lesson || !lesson.content) return null;

  var isInteractive = lesson.content.indexOf("FIELD:") !== -1 || lesson.content.indexOf("AREA:") !== -1 || lesson.content.indexOf("TABLE:") !== -1;
  var lines = lesson.content.split("\n");
  var lessonTitle = lesson.title;

  function rKey(fieldId) {
    return "f-" + moduleNum + "-" + lesson.num + "-" + fieldId;
  }

  function tKey(tableId, row, col) {
    return "t-" + moduleNum + "-" + lesson.num + "-" + tableId + "-" + row + "-" + col;
  }

  function handleFieldChange(fieldId, value) {
    setResponses(function (prev) {
      var next = Object.assign({}, prev);
      next[rKey(fieldId)] = value;
      return next;
    });
  }

  function handleTableChange(tableId, row, col, value) {
    setResponses(function (prev) {
      var next = Object.assign({}, prev);
      next[tKey(tableId, row, col)] = value;
      return next;
    });
  }

  function downloadInteractive() {
    var sections = [];
    var fieldIdx = 0;
    var tableIdx = 0;
    lines.forEach(function (line) {
      var t = line.trim();
      if (!t) return;

      if (t.startsWith("FIELD:")) {
        var label = stripHtml(t.substring(6));
        sections.push({ heading: label, body: responses[rKey("field-" + fieldIdx)] || "(No response)" });
        fieldIdx++;
      } else if (t.startsWith("AREA:")) {
        var label2 = stripHtml(t.substring(5));
        sections.push({ heading: label2, body: responses[rKey("area-" + fieldIdx)] || "(No response)" });
        fieldIdx++;
      } else if (t.startsWith("TABLE:")) {
        var parts = t.substring(6).split("|");
        var numRows = parseInt(parts[parts.length - 1]) || 5;
        var cols = parts.slice(0, -1);
        var tableData = [];
        for (var r = 0; r < numRows; r++) {
          var row = cols.map(function (_, c) { return responses[tKey("table-" + tableIdx, r, c)] || ""; });
          tableData.push(row);
        }
        sections.push({ type: "table", columns: cols, tableData: tableData });
        tableIdx++;
      } else if (t.startsWith("### ")) {
        sections.push({ type: "divider" });
        sections.push({ heading: t.replace("### ", "") });
      }
    });
    downloadPDF(
      lessonTitle.replace(/\s+/g, "_") + ".pdf",
      lessonTitle,
      sections
    );
  }

  /* Check if any interactive field has a response */
  var hasAnyResponse = false;
  if (isInteractive) {
    var checkIdx = 0;
    var checkTableIdx = 0;
    for (var li = 0; li < lines.length; li++) {
      var lt = lines[li].trim();
      if (lt.startsWith("FIELD:") || lt.startsWith("AREA:")) {
        var k = lt.startsWith("FIELD:") ? rKey("field-" + checkIdx) : rKey("area-" + checkIdx);
        if ((responses[k] || "").trim()) { hasAnyResponse = true; break; }
        checkIdx++;
      } else if (lt.startsWith("TABLE:")) {
        var tp = lt.substring(6).split("|");
        var nr = parseInt(tp[tp.length - 1]) || 5;
        var nc = tp.length - 1;
        for (var r = 0; r < nr; r++) {
          for (var c = 0; c < nc; c++) {
            if ((responses[tKey("table-" + checkTableIdx, r, c)] || "").trim()) { hasAnyResponse = true; break; }
          }
          if (hasAnyResponse) break;
        }
        if (hasAnyResponse) break;
        checkTableIdx++;
      }
    }
  }

  /* Render */
  var fieldIndex = 0;
  var tableIndex = 0;

  var rendered = lines.map(function (line, i) {
    var trimmed = line.trim();

    if (trimmed === "") return null;

    /* ── Interactive: FIELD → text input ── */
    if (trimmed.startsWith("FIELD:")) {
      var label = trimmed.substring(6);
      var fid = "field-" + fieldIndex;
      fieldIndex++;
      return (
        <div key={i} className="mb-4">
          <label className="block mb-1.5">
            <span className="font-body text-[14px] font-semibold text-ink"><RichText html={label} /></span>
          </label>
          <input
            type="text"
            value={responses[rKey(fid)] || ""}
            onChange={function (e) { handleFieldChange(fid, e.target.value); }}
            placeholder="Type here..."
            className="w-full rounded-lg border border-surface-border bg-surface-cream px-4 py-2.5 font-body text-[14px] text-ink placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
          />
        </div>
      );
    }

    /* ── Interactive: AREA → textarea ── */
    if (trimmed.startsWith("AREA:")) {
      var label2 = trimmed.substring(5);
      var aid = "area-" + fieldIndex;
      fieldIndex++;
      return (
        <div key={i} className="mb-4">
          <label className="block mb-1.5">
            <span className="font-body text-[14px] font-semibold text-ink"><RichText html={label2} /></span>
          </label>
          <textarea
            value={responses[rKey(aid)] || ""}
            onChange={function (e) { handleFieldChange(aid, e.target.value); }}
            placeholder="Type your response here..."
            rows={3}
            className="w-full rounded-lg border border-surface-border bg-surface-cream px-4 py-3 font-body text-[14px] text-ink leading-relaxed placeholder:text-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all resize-y"
          />
        </div>
      );
    }

    /* ── Interactive: TABLE → editable table ── */
    if (trimmed.startsWith("TABLE:")) {
      var parts = trimmed.substring(6).split("|");
      var numRows = parseInt(parts[parts.length - 1]) || 5;
      var cols = parts.slice(0, -1);
      var tid = "table-" + tableIndex;
      tableIndex++;
      var rowArray = [];
      for (var r = 0; r < numRows; r++) { rowArray.push(r); }
      return (
        <div key={i} className="mb-6 mt-2">
          <div className="overflow-x-auto rounded-lg border border-surface-border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-blue-light">
                  {cols.map(function (col, ci) {
                    return (
                      <th key={ci} className="px-3 py-2.5 text-left font-body text-[12px] font-bold text-brand-blue tracking-wide uppercase border-b border-surface-border">
                        {col}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rowArray.map(function (ri) {
                  return (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-surface-cream/50"}>
                      {cols.map(function (_, ci) {
                        return (
                          <td key={ci} className="px-1 py-1 border-b border-surface-border">
                            <input
                              type="text"
                              value={responses[tKey(tid, ri, ci)] || ""}
                              onChange={function (e) { handleTableChange(tid, ri, ci, e.target.value); }}
                              className="w-full px-2 py-1.5 font-body text-[13px] text-ink bg-transparent border-none focus:outline-none focus:bg-brand-blue-light/30 rounded transition-colors"
                              placeholder={"—"}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    /* ── Standard rendering below ── */

    if (trimmed.startsWith("## ")) {
      return <h2 key={i} className="font-display text-xl font-bold text-ink mt-8 mb-3">{trimmed.replace("## ", "")}</h2>;
    }

    if (trimmed.startsWith("### ")) {
      return <h3 key={i} className="font-body text-[15px] font-bold text-ink mt-7 mb-2">{trimmed.replace("### ", "")}</h3>;
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
          <span className="font-body text-[14px] text-ink-soft"><RichText html={trimmed.replace("- [ ] ", "")} /></span>
        </div>
      );
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <div key={i} className="flex items-start gap-2.5 mb-1.5 ml-1">
          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
          <span className="font-body text-[14px] text-ink-soft leading-relaxed"><RichText html={trimmed.replace(/^[-*] /, "")} /></span>
        </div>
      );
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      return <p key={i} className="font-mono text-[12px] text-ink-soft mb-0.5">{trimmed}</p>;
    }

    if (trimmed.startsWith("✅") || trimmed.startsWith("❌")) {
      return <p key={i} className="font-body text-[14px] text-ink-soft mb-1"><RichText html={trimmed} /></p>;
    }

    return <p key={i} className="font-body text-[14px] text-ink-soft leading-[1.8] mb-3"><RichText html={trimmed} /></p>;
  });

  return (
    <div>
      {isInteractive && <Disclaimer />}
      <div className={isInteractive ? "rounded-xl border border-surface-border bg-white p-5 md:p-6 shadow-sm" : "prose-lesson"}>
        {rendered}
      </div>
      {isInteractive && (
        <div className="mt-8 mb-4 flex justify-center">
          <button
            onClick={downloadInteractive}
            disabled={!hasAnyResponse}
            className={"flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-[14px] transition-all border-none " + (hasAnyResponse ? "bg-brand-blue text-white hover:brightness-110 shadow-md cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed")}
          >
            <DownloadIcon size={18} /> Download — {lessonTitle}
          </button>
        </div>
      )}
    </div>
  );
}


/* ════════════════════════════════════════════════════════════ */
/*  MAIN COURSE PAGE                                          */
/* ════════════════════════════════════════════════════════════ */

export default function CourseLearnPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [hasStrategy, setHasStrategy] = useState(false);
  const [hasQuestionBank, setHasQuestionBank] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState(1);
  const [activeLesson, setActiveLesson] = useState(1);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [practiceResponses, setPracticeResponses] = useState({});
  const [videoRecordings, setVideoRecordings] = useState({});

  /* Read ?m=X&l=Y from URL on mount */
  useEffect(function () {
    var p = new URLSearchParams(window.location.search);
    var m = parseInt(p.get("m"));
    var l = parseInt(p.get("l"));
    if (m >= 1 && m <= 7) setActiveModule(m);
    if (l >= 1) setActiveLesson(l);
  }, []);

  useEffect(function () {
    async function checkAccess() {
      var supabase = createClient();
      var result = await supabase.auth.getUser();
      var u = result.data.user;

      if (!u) {
        router.push("/auth/login?redirect=/course/learn");
        return;
      }

      setUser(u);

      var profileResult = await supabase
        .from("profiles")
        .select("has_strategy, has_question_bank, access_expires_at")
        .eq("id", u.id)
        .single();

      var profile = profileResult.data;
      if (profile && profile.access_expires_at) {
        var expires = new Date(profile.access_expires_at);
        if (expires > new Date()) {
          if (profile.has_strategy) setHasStrategy(true);
          if (profile.has_question_bank) setHasQuestionBank(true);
        }
      }

      var progressResult = await supabase
        .from("lesson_progress")
        .select("module_num, lesson_num")
        .eq("user_id", u.id)
        .eq("completed", true);

      if (progressResult.data) {
        var completed = new Set(progressResult.data.map(function (p) { return p.module_num + "-" + p.lesson_num; }));
        setCompletedLessons(completed);
      }

      setLoading(false);
    }

    checkAccess();
  }, [router]);

  function markComplete(modNum, lesNum) {
    var key = modNum + "-" + lesNum;
    if (completedLessons.has(key)) return;

    async function doMark() {
      var supabase = createClient();
      var result = await supabase.from("lesson_progress").upsert(
        {
          user_id: user.id,
          module_num: modNum,
          lesson_num: lesNum,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,module_num,lesson_num" }
      );

      if (!result.error) {
        setCompletedLessons(function (prev) { return new Set([...prev, key]); });
      }
    }
    doMark();
  }

  function goToNext() {
    var currentMod = COURSE_CONTENT.find(function (m) { return m.num === activeModule; });
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
      var prevMod = COURSE_CONTENT.find(function (m) { return m.num === activeModule - 1; });
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

  var hasAnyAccess = hasStrategy || hasQuestionBank;

  function canAccessModule(modNum) {
    /* Module 4 is partially free (lesson 3 only) — allow entering the module */
    if (modNum === 4) return true;
    if (hasStrategy && hasQuestionBank) return true;
    if (modNum <= 5) return hasStrategy;
    if (modNum >= 6) return hasQuestionBank;
    return false;
  }

  function canAccessLesson(modNum, lessonNum) {
    /* Module 4, Lesson 3 is free for all signed-up users */
    if (modNum === 4 && lessonNum === 3) return true;
    /* All other Module 4 lessons require Strategy access */
    if (modNum === 4) return hasStrategy;
    /* Other modules follow normal tier gating */
    if (hasStrategy && hasQuestionBank) return true;
    if (modNum <= 5) return hasStrategy;
    if (modNum >= 6) return hasQuestionBank;
    return false;
  }

  if (!hasAnyAccess && !canAccessModule(activeModule)) {
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <IconLock size={40} className="text-brand-blue mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-ink mb-3">Course Access Required</h1>
          <p className="font-body text-sm text-ink-muted mb-6">Choose a plan to start your CASPer preparation.</p>
          <Btn variant="primary" size="md" href="/checkout?plan=full">Get Full Course — $215 CAD</Btn>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/course/learn?m=4&l=3" className="text-sm text-brand-blue font-body font-semibold no-underline hover:underline">Preview free content — Video Tutorial →</Link>
            <Link href="/#pricing" className="text-sm text-ink-muted font-body no-underline hover:underline">View all plans</Link>
          </div>
        </div>
      </div>
    );
  }

  /* Check if current module is accessible */
  var moduleAccessible = canAccessModule(activeModule);

  if (!moduleAccessible) {
    var needsPlan = activeModule <= 5 ? "strategy" : "question_bank";
    var needsLabel = activeModule <= 5 ? "Strategy Course" : "Question Bank";
    var needsPrice = activeModule <= 5 ? 149 : 99;
    return (
      <div className="min-h-screen bg-surface-cream flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <IconLock size={40} className="text-brand-orange mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-ink mb-3">Module {activeModule} is Locked</h1>
          <p className="font-body text-sm text-ink-muted mb-6">
            This module is part of the {needsLabel}. Unlock it to continue your preparation.
          </p>
          <Btn variant="primary" size="md" href={"/checkout?plan=" + needsPlan}>
            Get {needsLabel} — ${needsPrice} CAD
          </Btn>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/course/learn?m=4&l=3" className="text-sm text-brand-blue font-body font-semibold no-underline hover:underline">Preview free content — Video Tutorial →</Link>
            <Link href="/dashboard" className="text-sm text-ink-muted font-body no-underline hover:underline">← Back to Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  var currentModule = COURSE_CONTENT.find(function (m) { return m.num === activeModule; });
  var currentLesson = currentModule ? currentModule.lessons.find(function (l) { return l.num === activeLesson; }) : null;
  var totalLessons = COURSE_CONTENT.reduce(function (sum, m) { return sum + m.lessons.length; }, 0);
  var completedCount = completedLessons.size;
  var progressPercent = Math.round((completedCount / totalLessons) * 100);
  var isFirstLesson = activeModule === 1 && activeLesson === 1;
  var isLastLesson = activeModule === COURSE_CONTENT.length && currentModule && activeLesson === currentModule.lessons.length;

  var showPracticeSet = isPracticeSet(currentLesson);

  return (
    <div className="min-h-screen bg-surface-cream">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-surface-border h-[56px] flex items-center px-4 md:px-6">
        <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
          <div className="flex items-center gap-4">
            <button onClick={function () { setSidebarOpen(!sidebarOpen); }} className="md:hidden flex flex-col gap-1 p-2">
              {[0, 1, 2].map(function (idx) { return <div key={idx} className="w-4 h-0.5 bg-ink" />; })}
            </button>
            <Link href="/dashboard" className="no-underline"><BrandMark scrolled={true} /></Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-2 rounded-full bg-surface-border overflow-hidden">
                <div className="h-full rounded-full bg-brand-orange transition-all" style={{ width: progressPercent + "%" }} />
              </div>
              <span className="text-[11px] text-ink-muted font-mono">{completedCount}/{totalLessons}</span>
            </div>
            <Link href="/dashboard" className="text-[13px] text-ink-soft font-body no-underline hover:text-ink">Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="pt-[56px] flex">
        {/* Sidebar */}
        <aside className={"fixed md:sticky top-[56px] left-0 h-[calc(100vh-56px)] w-[280px] bg-white border-r border-surface-border overflow-y-auto z-40 transition-transform " + (sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0")}>
          <div className="p-4">
            {COURSE_CONTENT.map(function (mod) {
              return (
                <div key={mod.num} className="mb-3">
                  <button
                    onClick={function () { setActiveModule(mod.num); setActiveLesson(1); setSidebarOpen(false); }}
                    className={"w-full text-left px-3 py-2 rounded-lg text-[12px] font-bold font-body tracking-[0.5px] uppercase transition-colors " + (activeModule === mod.num ? "bg-brand-blue-light text-brand-blue" : "text-ink-muted hover:bg-gray-50")}
                  >
                    M{mod.num}: {mod.title}
                  </button>
                  {activeModule === mod.num && (
                    <div className="mt-1 ml-2">
                      {mod.lessons.map(function (les) {
                        var isComplete = completedLessons.has(mod.num + "-" + les.num);
                        var isActive = activeModule === mod.num && activeLesson === les.num;
                        var isLessonLocked = !canAccessLesson(mod.num, les.num);
                        return (
                          <button
                            key={les.num}
                            onClick={function () { setActiveLesson(les.num); setSidebarOpen(false); }}
                            className={"w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-body transition-colors " + (isActive ? "bg-brand-orange-light text-ink font-semibold" : isLessonLocked ? "text-ink-muted opacity-60 hover:bg-gray-50" : "text-ink-soft hover:bg-gray-50")}
                          >
                            <div className={"w-4 h-4 rounded-full flex items-center justify-center shrink-0 " + (isLessonLocked ? "bg-surface-border" : isComplete ? "bg-green-500" : isActive ? "bg-brand-orange" : "bg-surface-border")}>
                              {isLessonLocked ? <IconLock size={8} className="text-ink-muted" /> : isComplete ? <IconCheck size={10} className="text-white" /> : null}
                            </div>
                            <span className="truncate">{les.title}{isLessonLocked ? "" : ""}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={function () { setSidebarOpen(false); }} />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-[720px] mx-auto">

            {/* Lesson-level lock check (e.g. Module 4 Tutorials 1 & 2 are locked) */}
            {!canAccessLesson(activeModule, activeLesson) ? (
              <div className="text-center py-20">
                <IconLock size={40} className="text-brand-orange mx-auto mb-4" />
                <h2 className="font-display text-xl font-bold text-ink mb-3">
                  {currentLesson ? currentLesson.title : "Lesson"} is Locked
                </h2>
                <p className="font-body text-sm text-ink-muted mb-6 max-w-md mx-auto">
                  This tutorial is part of the Strategy Course. Unlock all expert video tutorials, frameworks, and the ideas bank.
                </p>
                <Btn variant="primary" size="md" href="/checkout?plan=strategy">
                  Get Strategy Course — $149 CAD
                </Btn>
                <div className="mt-3">
                  <Btn variant="secondary" size="sm" href="/checkout?plan=full">
                    Or get the Full Course — $215 CAD
                  </Btn>
                </div>
                <div className="mt-4">
                  <button onClick={function () { setActiveLesson(3); }} className="text-sm text-brand-blue font-body font-semibold hover:underline cursor-pointer bg-transparent border-none">
                    Watch Tutorial 3 for free →
                  </button>
                </div>
              </div>
            ) : (
            <>

            {currentLesson && currentLesson.image && (
              <div className="mb-6 rounded-xl overflow-hidden border border-surface-border">
                <img src={currentLesson.image} alt={currentLesson.title} className="w-full h-auto object-cover" />
              </div>
            )}

            <div className="mb-6">
              <p className="font-mono text-[11px] text-brand-orange font-bold tracking-[2px] uppercase mb-1.5">
                Module {activeModule} &middot; Lesson {activeLesson}
              </p>
              <h1 className="font-display text-[24px] md:text-[28px] font-bold text-ink leading-tight">
                {currentLesson ? currentLesson.title : ""}
              </h1>
            </div>

            {currentLesson && currentLesson.type === "video" && currentLesson.videoId && (
              <div className="mb-8">
                <VideoThumbnail title={currentLesson.title} videoId={currentLesson.videoId} subtitle={"Module " + activeModule + " — Tutorial"} />
              </div>
            )}

            {/* Practice Set renderer (Module 6) */}
            {showPracticeSet && (
              <PracticeSetView
                lesson={currentLesson}
                moduleNum={activeModule}
                responses={practiceResponses}
                setResponses={setPracticeResponses}
                recordings={videoRecordings}
                setRecordings={setVideoRecordings}
              />
            )}

            {/* Everything else: normal content + interactive forms all through one renderer */}
            {!showPracticeSet && (
              <LessonContentRenderer
                lesson={currentLesson}
                moduleNum={activeModule}
                responses={practiceResponses}
                setResponses={setPracticeResponses}
              />
            )}

            {/* Bottom actions */}
            <div className="mt-10 pt-6 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {!isFirstLesson && (
                  <button onClick={goToPrev} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-cream border border-surface-border text-ink-soft font-body font-semibold text-[14px] hover:bg-gray-100 transition-all cursor-pointer">
                    ← Previous
                  </button>
                )}
                <button
                  onClick={function () { markComplete(activeModule, activeLesson); }}
                  className={"px-5 py-2.5 rounded-lg font-body font-semibold text-[14px] transition-all " + (completedLessons.has(activeModule + "-" + activeLesson) ? "bg-green-50 text-green-700 border border-green-200 cursor-default" : "bg-brand-blue text-white hover:brightness-110 cursor-pointer border-none")}
                >
                  {completedLessons.has(activeModule + "-" + activeLesson) ? "✓ Completed" : "Mark as Complete"}
                </button>
              </div>

              {!isLastLesson && (
                <button onClick={goToNext} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange text-white font-body font-semibold text-[14px] hover:brightness-110 transition-all cursor-pointer border-none">
                  Next Lesson <IconArrow size={14} />
                </button>
              )}

              {isLastLesson && (
                <div className="text-center">
                  <p className="font-body text-sm font-semibold text-green-700">🎉 You&apos;ve completed the entire course!</p>
                </div>
              )}
            </div>
            </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}


