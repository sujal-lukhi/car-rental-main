const booking = await Booking.create({
  car: req.body.carId,
  user: req.user.id,
  status: "PENDING",
});

const clientUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:5173';

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  mode: "payment",

  line_items: [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Car Booking",
        },
        unit_amount: req.body.amount * 100,
      },
      quantity: 1,
    },
  ],

  success_url: `${clientUrl}/booking-success`,
  cancel_url: `${clientUrl}/booking-cancel`,

  metadata: {
    bookingId: booking._id.toString(),
  },
});
