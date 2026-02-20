import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

// Use the service role key here since webhooks run without user context
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    const userEmail = session.metadata?.user_email;

    if (!userId) {
      console.error("No user_id in session metadata:", session.id);
      return NextResponse.json(
        { error: "Missing user_id in metadata" },
        { status: 400 }
      );
    }

    // Grant access for 6 months
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + 6);

    const { error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({
        has_access: true,
        access_granted_at: now.toISOString(),
        access_expires_at: expiresAt.toISOString(),
        stripe_customer_id: session.customer || null,
        stripe_payment_id: session.payment_intent || null,
      })
      .eq("id", userId);

    if (updateError) {
      console.error("Failed to update profile:", updateError);
      return NextResponse.json(
        { error: "Failed to grant access" },
        { status: 500 }
      );
    }

    console.log(
      `Access granted for user ${userId} (${userEmail}) until ${expiresAt.toISOString()}`
    );
  }

  return NextResponse.json({ received: true });
}