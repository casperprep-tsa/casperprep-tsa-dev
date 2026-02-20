import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

var PLAN_CONFIG = {
  strategy: {
    name: "CASPer Expert Strategy Course — Strategy (Modules 1-5)",
    price: 14900,
  },
  question_bank: {
    name: "CASPer Expert Strategy Course — Question Bank (Modules 6-7)",
    price: 9900,
  },
  full: {
    name: "CASPer Expert Strategy Course — Full Course (All 7 Modules)",
    price: 21500,
  },
  upgrade: {
    name: "CASPer Expert Strategy Course — Upgrade to Full Course",
    price: 6600,
  },
};

function getStripe() {
  var Stripe = require("stripe");
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function POST(request) {
  try {
    var body = await request.json();
    var plan = body.plan;
    var email = body.email;

    if (!plan || !PLAN_CONFIG[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    var config = PLAN_CONFIG[plan];
    var stripe = getStripe();

    var session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: { name: config.name },
            unit_amount: config.price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: process.env.NEXT_PUBLIC_SITE_URL + "/dashboard?success=1&plan=" + plan,
      cancel_url: process.env.NEXT_PUBLIC_SITE_URL + "/checkout?plan=" + plan,
      metadata: { plan: plan },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}