import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    try{
        const token = req.cookies["access-token"];
        if(!token){
            return res.status(401).json({message: "Unauthorized: Token not found"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if(!decoded) return res.status(401).json({message: "Unauthorized: Invalid token"});
        (req as any).user = decoded;
        next();
    }
    catch(error){
        return res.status(500).json({message: "Auth-middleware: Internal server error: "+ error});
    }
}