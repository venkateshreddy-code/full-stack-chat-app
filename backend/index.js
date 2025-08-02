import express from "express";
import dotenv from "dotenv";

dotenv.config();

console.log("Starting server...");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});

console.log("Server setup complete!");
