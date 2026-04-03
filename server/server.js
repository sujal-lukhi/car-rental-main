import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import router from "./routes/webhookRoutes.js";

const app = express();

const startServer = async () => {
    try {
        // Connect DB
        await connectDB();

        // Middleware
        app.use(cors());

        app.use("/api/stripe-webhook", express.raw({ type: "application/json" }), router);
        app.use(express.json());

        app.get("/", (req, res) => res.send("Server is running"));

        app.use("/api/user", userRouter);
        app.use("/api/owner", ownerRouter);
        app.use("/api/bookings", bookingRouter);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server start error:", error);
        process.exit(1);
    }
};

startServer();