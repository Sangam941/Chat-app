import bcrypt from "bcrypt"
import { prisma } from "../lib/prisma";
import { Response } from "express";

export const registerUser = async(name:string, email:string,password:string)=>{
    try{
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword
            }
        })

        return user
    }
    catch(error){
        throw new Error("Failed to register user: " + error);
    }
}


export const loginUser = async(res:Response, email:string, password:string)=>{
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })

    if(!user){
        throw new Error("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        throw new Error("Invalid password");
    }

    return user

}
