import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import { authMiddleware } from "./middleware/auth.middleware";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import conversationRoutes from "./routes/conversation.route";
import messageRoutes from "./routes/message.route"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("/api/message", messageRoutes)

app.get("/", (_req, res) => {
  res.json({
    message: "Chat server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});