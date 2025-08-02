import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();

console.log("Basic imports successful...");

// Test 1: Try importing database connection
try {
    const { connectDB } = await import("./src/lib/db.js");
    console.log("✓ Database import successful");
} catch (error) {
    console.log("✗ Database import failed:", error.message);
}

// Test 2: Try importing auth routes
try {
    const authRoutes = await import("./src/routes/auth.route.js");
    console.log("✓ Auth routes import successful");
} catch (error) {
    console.log("✗ Auth routes import failed:", error.message);
}

// Test 3: Try importing message routes
try {
    const messageRoutes = await import("./src/routes/message.route.js");
    console.log("✓ Message routes import successful");
} catch (error) {
    console.log("✗ Message routes import failed:", error.message);
}

// Test 4: Try importing socket
try {
    const { server, app } = await import("./src/lib/socket.js");
    console.log("✓ Socket import successful");
} catch (error) {
    console.log("✗ Socket import failed:", error.message);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Debug server is running!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Debug server is running on port: ${PORT}`);
});
