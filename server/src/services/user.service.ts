import { prisma } from "../lib/prisma";

export const getMe = async(userId:number)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true,
                updatedAt:true
            }
        })
        return user
    }
    catch{
        throw new Error("Failed to fetch user details");
    }
}


export const fetchAllUsers = async(currentUserId:number)=>{
    try{
        const users = await prisma.user.findMany({
            where:{
                id:{
                    not:currentUserId
                }
            },
            select:{
                id:true,
                name:true,
            }
        })
        return users
    }
    catch(error){
        throw new Error("Failed to fetch all users");
    }
}