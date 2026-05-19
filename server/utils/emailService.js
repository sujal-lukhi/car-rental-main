import transporter from "../configs/mailer.js";

/**
 * Sends a booking confirmation email to the user.
 * @param {string} userEmail - The email address of the user.
 * @param {Object} bookingDetails - Contains car brand, model, pickupDate, returnDate, and price.
 */
export const sendBookingConfirmationEmail = async (userEmail, bookingDetails) => {
  try {
    const { carBrand, carModel, pickupDate, returnDate, price } = bookingDetails;

    // Format dates to be more readable
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedPickup = new Date(pickupDate).toLocaleDateString(undefined, options);
    const formattedReturn = new Date(returnDate).toLocaleDateString(undefined, options);

    const mailOptions = {
      from: `"Premium Car Rentals" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Your Car Booking is Confirmed!",
      html: `
        <div style="font-family: 'Inter', Helvetica, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0d0d0d; color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
          
          <div style="background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); padding: 30px; text-align: center; border-bottom: 1px solid #333;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 1px;">Booking Confirmed!</h1>
            <p style="margin: 10px 0 0; color: #aaaaaa; font-size: 16px;">Get ready for your next adventure.</p>
          </div>

          <div style="padding: 40px 30px; background-color: #121212;">
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 25px; color: #e0e0e0;">
              Hi there,<br><br>
              Great news! Your payment was successful and your booking is now <strong>confirmed</strong>. Here are your booking details:
            </p>

            <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 20px; margin-bottom: 30px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #888888; width: 40%;">Vehicle</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: 600; text-align: right;">${carBrand} ${carModel}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #888888;">Pick-up Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: 600; text-align: right;">${formattedPickup}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #888888;">Drop-off Date</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); color: #ffffff; font-weight: 600; text-align: right;">${formattedReturn}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888888;">Total Amount</td>
                  <td style="padding: 10px 0; color: #4ade80; font-weight: 700; text-align: right; font-size: 18px;">₹${price}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 14px; color: #888888; text-align: center; margin-top: 30px; line-height: 1.5;">
              You can view all your trips by visiting the "My Bookings" page on our website.<br><br>
              Safe travels,<br>
              <strong>The Premium Car Rentals Team</strong>
            </p>
          </div>

          <div style="background-color: #0a0a0a; padding: 20px; text-align: center; border-top: 1px solid #222;">
            <p style="margin: 0; color: #555555; font-size: 12px;">
              © ${new Date().getFullYear()} Premium Car Rentals. All rights reserved.
            </p>
          </div>

        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Booking Confirmation Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    return false;
  }
};
