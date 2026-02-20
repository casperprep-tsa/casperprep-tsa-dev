"use client";

import { useState } from "react";

export default function EnrollButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEnroll() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-brand-orange text-white font-body font-semibold text-[16px] hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer border-none"
      >
        {loading ? "Redirecting to checkout..." : "Enroll Now — $249 CAD"}
      </button>
      {error && (
        <p className="text-sm text-red-600 font-body text-center mt-3">
          {error}
        </p>
      )}
    </div>
  );
}