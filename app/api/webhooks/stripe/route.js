import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getStripe() {
  const Stripe = require("stripe");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export const dynamic = "force-dynamic";

export async function POST(request) {
  const stripe = getStripe();
  const supabaseAdmin = getSupabaseAdmin();

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email || session.customer_email;

    if (email) {
      const { data: users } = await supabaseAdmin.auth.admin.listUsers();
      const user = users?.users?.find((u) => u.email === email);

      if (user) {
        const expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 6);

        await supabaseAdmin
          .from("profiles")
          .update({
            has_access: true,
            access_expires_at: expiresAt.toISOString(),
            stripe_customer_id: session.customer,
          })
          .eq("id", user.id);

        console.log(`Access granted to ${email} until ${expiresAt.toISOString()}`);
      } else {
        console.log(`No user found for email: ${email}`);
      }
    }
  }

  return NextResponse.json({ received: true });
}