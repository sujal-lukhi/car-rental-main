import express from "express";
import Stripe from "stripe";
import Booking from "../models/Booking.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Payment successful
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const bookingId = session.metadata.bookingId;

      try {
        await Booking.findByIdAndUpdate(bookingId, {
          status: "confirmed",
        });
        console.log("Booking confirmed:", bookingId);
      } catch (err) {
        console.log("DB update error:", err.message);
      }
    }

    res.json({ received: true });
  }
);

export default router;
