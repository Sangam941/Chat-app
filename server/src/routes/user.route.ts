import express from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { getAllUsers, me } from "../controllers/user.controller"

const router = express.Router()

router.get("/me", authMiddleware, me)
router.get("/all", authMiddleware, getAllUsers)

export default router