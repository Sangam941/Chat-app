import { Request, Response } from "express";

export const getAllConversations = (req:Request, res:Response)=>{
    try {
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }

        const conversations = 
    } catch (error) {
        return res.status(500).json({message: "Internal server error: ", error});
    }
}