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


export const createNewConversation = async(userId:number, participantId:number)=>{
    try{
        if(userId === participantId){
            throw new Error("Cannot create conversation with yourself")
        }

        const existingConversation = await prisma.conversation.findFirst({
            where:{
                members:{
                    every:{
                        userId:{
                            in:[userId, participantId]
                        }
                    }
                }
            },
            include:{
                members:{
                    include:{
                        user:{
                            select:{
                                id:true,
                                name:true,
                                email:true
                            }
                        }
                    }
                }
            }
        })

        if(existingConversation){
            return existingConversation
        }

        return await prisma.conversation.create({
            data:{
                members:{
                    createMany:{
                        data:[
                            {userId},
                            {userId: participantId}
                        ]
                    }
                }
            },
            include:{
                members:{
                    include:{
                        user:{
                            select:{
                                id:true,
                                name:true,
                                email:true
                            }
                        }
                    }
                }
            }
        })

    }catch(error){
        throw new Error("Error while creating conversation: " + error)
    }
}
