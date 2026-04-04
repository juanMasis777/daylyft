import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST(req) {
try {
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { priceId } = await req.json();

const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
});

return NextResponse.json({ url: session.url });
} catch (err) {
console.error("STRIPE ERROR:", err.message);
return NextResponse.json({ error: err.message }, { status: 500 });
}
}