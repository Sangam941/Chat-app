import { Request, Response } from "express";
import { createNewMessage, getConversationMessages } from "../services/message.service";

export const fetchConversationsMessage = async(req:Request, res:Response)=>{
    try {
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }

        const {conversationId} = req.params

        const getAllConversations = await getConversationMessages(user.id, Number(conversationId))

        return res.status(200).json({message:"All conversations of this chat fetched successfully", getAllConversations})
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error: "+ error});
    }
}

export const createMessage = async(req:Request, res:Response)=>{
    try {
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }

        const {conversationId} = req.params

        const {content} = req.body

        if(!content || content.trim().length < 0){
            throw new Error("Content should not be empty")
        }
        console.log("form message controller")

        const sentMessage = await createNewMessage(user.id, Number(conversationId), content)

        return res.status(200).json({message:"message sent successfully", sentMessage})
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error: "+ error});
    }
}