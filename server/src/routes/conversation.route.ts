import express from 'express'
import { createConversation, getAllConversations } from '../controllers/conversation.controller'
import { authMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

router.use(authMiddleware)
router.get('/', getAllConversations)
router.post('/:participantId', createConversation)

export default router   