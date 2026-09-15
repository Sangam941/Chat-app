import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";
import { generateToken } from "../utils/tokenGenerator";

export const register = async(req:Request, res:Response)=>{
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await registerUser(name, email, password)

        return res.json({message: "User registered successfully", user});
    }
    catch(error){
        return res.status(500).json({message: "Internal server error: ", error});
    }
}


export const login = async(req:Request, res:Response)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await loginUser(res, email, password);

        const token = generateToken(user.id);
        res.cookie("access-token", token,{
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 60 * 60 * 1000, // 1 hour
        })
        return res.json({token,message: "Login successful", user});
    }
    catch(error){
        return res.status(500).json({message: "Internal server error: ", error});
    }

}


export const logout = async(req:Request, res:Response)=>{
    try{
        res.cookie("access-token","",{
            httpOnly: process.env.NODE_ENV === "production",
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 0, // Expire the cookie immediately
        })
        return res.json({message: "Logout successful"});
    }
    catch(error){
        return res.status(500).json({message: "Internal server error: ", error});
    }
}