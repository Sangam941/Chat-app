import { prisma } from "../lib/prisma"

export const fetchALlConversations=async (userId: number)=>{
    try{
        const conversations = await prisma.conversation.findMany({
            where:{
                members:{
                    some:{
                        userId
                    }
                }
            }
        })

        return conversations
    }catch(error){
        throw new Error("Error while fetching conversations: "+error)
    }
}
