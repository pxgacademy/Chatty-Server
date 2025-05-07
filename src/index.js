// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// Core modules and libraries
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Local modules
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

// Constants
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatty-xyz.web.app",
      "https://chatty-xyz.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start server
server.listen(PORT, () => {
  // console.log(`🚀 Server running on port ${PORT}`);
  connectDB();
});
