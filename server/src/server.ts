import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route";
import { authMiddleware } from "./middleware/auth.middleware";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route";
import conversationRoutes from "./routes/conversation.route";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/conversation", conversationRoutes);

app.get("/", (_req, res) => {
  res.json({
    message: "Chat server is running",
  });
});

app.listen(PORT, () => {
    // console.log(process.env.DATABASE_URL)
  console.log(`Server running on port ${PORT}`);
});