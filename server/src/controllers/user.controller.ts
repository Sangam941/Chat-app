import { Request, Response } from "express";
import { fetchAllUsers, getMe } from "../services/user.service";

export const me = async(req:Request, res:Response)=>{
    try{
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }

        const authenticatedUser = await getMe(user.id)

        return res.status(200).json({message: "User details fetched successfully", user:authenticatedUser});
    }
    catch(error){
        return res.status(500).json({message: "Internal server error: ", error});
    }
}

export const getAllUsers = async(req:Request, res:Response)=>{
    try{
        const user = (req as any).user
        if(!user){
            return res.status(401).json({message: "Unauthorized: User not found"});
        }   
        const users = await fetchAllUsers(user.id)
        return res.status(200).json({message: "Users fetched successfully", users});
    }
    catch(error){
        return res.status(500).json({message: "Internal server error: ", error});
    }
}
