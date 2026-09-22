import express from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { createMessage, fetchConversationsMessage } from "../controllers/message.controller"

const router = express.Router()

router.use(authMiddleware)

router.get("/:conversationId", fetchConversationsMessage)
router.post("/:conversationId", createMessage)

export default router