import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    // Verify user is authenticated
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to enroll." },
        { status: 401 }
      );
    }

    // Check if user already has access
    const { data: profile } = await supabase
      .from("profiles")
      .select("has_access, access_expires_at")
      .eq("id", user.id)
      .single();

    if (profile?.has_access) {
      const expiresAt = profile.access_expires_at
        ? new Date(profile.access_expires_at)
        : null;
      if (!expiresAt || expiresAt > new Date()) {
        return NextResponse.json(
          { error: "You already have active course access." },
          { status: 400 }
        );
      }
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        user_email: user.email,
      },
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "CASPer Expert Strategy Course v2.0",
              description:
                "Complete 7-module program — frameworks, expert video tutorials, practice scenarios, and 40+ high-impact ideas.",
            },
            unit_amount: 24900, // $249.00 CAD in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}