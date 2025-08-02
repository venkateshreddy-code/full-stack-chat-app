import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
console.log("=== STEP 2: Testing route usage ===");

const app = express();

// Basic middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

async function testRoutes() {
    try {
        console.log("Testing auth routes...");
        const authRoutes = await import("./src/routes/auth.route.js");
        app.use("/api/auth", authRoutes.default);
        console.log("✅ Auth routes mounted successfully");
    } catch (error) {
        console.log("❌ Auth routes failed:", error.message);
        console.log("Full error:", error);
        return false;
    }

    try {
        console.log("Testing message routes...");
        const messageRoutes = await import("./src/routes/message.route.js");
        app.use("/api/messages", messageRoutes.default);
        console.log("✅ Message routes mounted successfully");
    } catch (error) {
        console.log("❌ Message routes failed:", error.message);
        console.log("Full error:", error);
        return false;
    }

    return true;
}

testRoutes().then(success => {
    if (success) {
        console.log("🎉 All routes mounted successfully!");
    } else {
        console.log("🔥 Route mounting failed - check error above");
    }
    
    app.get("/", (req, res) => res.json({ status: "Step 2 complete" }));
    app.listen(3000, () => console.log("Server running on port 3000"));
}).catch(error => {
    console.log("❌ Critical error in testRoutes:", error);
});
