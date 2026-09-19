import { Request, Response } from "express";
import { createNewConversation, fetchALlConversations } from "../services/conversation.service";

export const getAllConversations = async (req:Request, res:Response)=>{
    try {
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }

        const conversations = await fetchALlConversations(user.id);
        return res.status(200).json({message: "Conversations fetched successfully", conversations});
    } catch (error) {
        return res.status(500).json({message: "Internal server error: "+ error});
    }
}


export const createConversation = async(req:Request, res:Response)=>{
    try{
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }

        const {participantId} = req.params
        const conversation = await createNewConversation(user.id, Number(participantId))

        return res.status(201).json({message: "Conversation created successfully", conversation});
    }catch(error){
        return res.status(500).json({message: "Internal server error: "+ error});
    }
}