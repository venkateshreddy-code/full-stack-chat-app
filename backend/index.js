import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

console.log("🚀 Starting production server...");

async function startServer() {
    try {
        // Import socket setup
        console.log("Importing socket...");
        const { server, app } = await import("./src/lib/socket.js");
        console.log("✅ Socket imported");

        // Middleware setup
        console.log("Setting up middleware...");
        app.use(cors({
            origin: process.env.NODE_ENV === "production" 
                ? ["https://full-stack-chat-app-3tnq.onrender.com", "https://localhost:5173"]
                : "http://localhost:5173",
            credentials: true,
        }));

        app.use(express.json({ limit: '50mb' }));
        app.use(express.urlencoded({ extended: true, limit: '50mb' }));
        app.use(cookieParser());
        console.log("✅ Middleware configured");

        // Routes setup
        console.log("Setting up routes...");
        const authRoutes = await import("./src/routes/auth.route.js");
        const messageRoutes = await import("./src/routes/message.route.js");
        
        app.use("/api/auth", authRoutes.default);
        app.use("/api/messages", messageRoutes.default);
        console.log("✅ Routes mounted");

        // Production static files
        if (process.env.NODE_ENV === "production") {
            console.log("Setting up production static files...");
            app.use(express.static(path.join(__dirname, "../frontend/dist")));
            
            // Use a more specific catch-all pattern instead of "*"
            app.get(/^\/(?!api).*/, (req, res) => {
                res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
            });
            console.log("✅ Static files configured");
        }

        // Health check endpoint
        app.get("/api/health", (req, res) => {
            res.json({ 
                status: "OK", 
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development'
            });
        });

        // Database connection
        console.log("Connecting to database...");
        const { connectDB } = await import("./src/lib/db.js");
        await connectDB();
        console.log("✅ Database connected");

        // Start server
        server.listen(PORT, () => {
            console.log();
            console.log("=".repeat(50));
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 URL: https://full-stack-chat-app-3tnq.onrender.com`);
            console.log("=".repeat(50));
            console.log();
        });

    } catch (error) {
        console.error("❌ Server startup failed:", error);
        console.error("Stack trace:", error.stack);
        process.exit(1);
    }
}

startServer();
