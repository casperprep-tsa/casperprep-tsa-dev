import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getStripe() {
  var Stripe = require("stripe");
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
  var stripe = getStripe();
  var supabaseAdmin = getSupabaseAdmin();

  var body = await request.text();
  var sig = request.headers.get("stripe-signature");

  var event;

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
    var session = event.data.object;
    var email = session.customer_details?.email || session.customer_email;
    var plan = session.metadata?.plan || "full";

    if (email) {
      var usersResult = await supabaseAdmin.auth.admin.listUsers();
      var user = usersResult.data?.users?.find(function (u) { return u.email === email; });

      if (user) {
        var expiresAt = new Date();
        expiresAt.setMonth(expiresAt.getMonth() + 6);

        var updateData = {
          stripe_customer_id: session.customer,
          access_expires_at: expiresAt.toISOString(),
        };

        if (plan === "strategy") {
          updateData.has_strategy = true;
          updateData.has_access = false;
          updateData.strategy_purchased_at = new Date().toISOString();
        } else if (plan === "question_bank") {
          updateData.has_question_bank = true;
          /* Check if they already have strategy — if so, give full access */
          var profileResult = await supabaseAdmin
            .from("profiles")
            .select("has_strategy")
            .eq("id", user.id)
            .single();
          if (profileResult.data?.has_strategy) {
            updateData.has_access = true;
          }
        } else if (plan === "full" || plan === "upgrade") {
          updateData.has_strategy = true;
          updateData.has_question_bank = true;
          updateData.has_access = true;
          if (!updateData.strategy_purchased_at) {
            updateData.strategy_purchased_at = new Date().toISOString();
          }
        }

        await supabaseAdmin
          .from("profiles")
          .update(updateData)
          .eq("id", user.id);

        console.log("Access granted (" + plan + ") to " + email + " until " + expiresAt.toISOString());
      } else {
        console.log("No user found for email: " + email);
      }
    }
  }

  return NextResponse.json({ received: true });
}