import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
console.log("=== STEP 3: Testing socket integration ===");

async function testSocket() {
    try {
        console.log("Importing socket...");
        const { server, app } = await import("./src/lib/socket.js");
        console.log("✅ Socket imported successfully");
        
        // Setup middleware on socket app
        app.use(express.json());
        app.use(cookieParser());
        app.use(cors({
            origin: "http://localhost:5173",
            credentials: true,
        }));
        console.log("✅ Middleware added to socket app");

        // Test mounting routes on socket app
        try {
            console.log("Mounting auth routes on socket app...");
            const authRoutes = await import("./src/routes/auth.route.js");
            app.use("/api/auth", authRoutes.default);
            console.log("✅ Auth routes on socket app - OK");
        } catch (error) {
            console.log("❌ Auth routes on socket app failed:", error.message);
            console.log("Full error:", error);
            return false;
        }

        try {
            console.log("Mounting message routes on socket app...");
            const messageRoutes = await import("./src/routes/message.route.js");
            app.use("/api/messages", messageRoutes.default);
            console.log("✅ Message routes on socket app - OK");
        } catch (error) {
            console.log("❌ Message routes on socket app failed:", error.message);
            console.log("Full error:", error);
            return false;
        }

        app.get("/", (req, res) => res.json({ status: "Step 3 complete - Socket working!" }));
        
        console.log("Starting socket server...");
        server.listen(3000, () => {
            console.log("🎉 Socket server running on port 3000");
        });
        
        return true;
    } catch (error) {
        console.log("❌ Socket integration failed:", error.message);
        console.log("Full error:", error);
        return false;
    }
}

testSocket();
