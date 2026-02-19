"use client";

import { Btn } from "@/components/ui/Primitives";

export default function EnrollButton() {
  return (
    <Btn
      variant="primary"
      size="lg"
      full
      onClick={() =>
        window.alert(
          "Payment integration coming soon. Contact info.thesuccessarchitect@gmail.com to enroll."
        )
      }
    >
      Enroll Now
    </Btn>
  );
}
