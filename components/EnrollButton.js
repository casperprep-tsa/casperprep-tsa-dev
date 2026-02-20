"use client";

import { useState } from "react";
import { Btn } from "@/components/ui/Primitives";
import { createClient } from "@/lib/supabase/client";

export default function EnrollButton({ plan = "full", label, className }) {
  var ref = useState(false);
  var loading = ref[0], setLoading = ref[1];

  async function handleClick() {
    setLoading(true);
    try {
      var supabase = createClient();
      var result = await supabase.auth.getUser();
      var email = result.data?.user?.email || undefined;

      var res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan, email: email }),
      });

      var data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again or contact support.");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <Btn
      variant="primary"
      size="lg"
      full
      onClick={handleClick}
      className={className}
    >
      {loading ? "Loading..." : label || "Enroll Now"}
    </Btn>
  );
}