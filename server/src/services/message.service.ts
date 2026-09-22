import { prisma } from "../lib/prisma"

export const createNewMessage = async (senderId:number, conversationId:number, content:string)=>{
    try{
        // check whether the sender is a member of the conversation
        const isMember = await prisma.conversationMembers.findUnique({
            where:{
                userId_conversationId:{
                    userId:senderId,
                    conversationId,
                }   
            }
        })

        if(!isMember){
            throw new Error("User is not a member of this conversation")
        }

        // create the new message
        const [newMessage] = await prisma.$transaction([
            prisma.message.create({
                data:{
                    senderId,
                    conversationId,
                    content
                }
            }),

            // update the conversation's updatedAt field
            prisma.conversation.update({
                where:{
                    id:conversationId,
                },
                data:{
                    updatedAt: new Date()
                }
            })
        ])

        return newMessage
    }
    
    catch(error){
        throw new Error("Error while creating message: "+error)
    }
}


export const getConversationMessages = async(userId:number, conversationId:number)=>{
    try {
        const isMember = await prisma.conversationMembers.findUnique({
            where:{
                userId_conversationId:{
                    userId,
                    conversationId,
                }
            }
        })

        if(!isMember){
            throw new Error("User is not a member of this conversation")
        }

        // fetch the messages
        return await prisma.message.findMany({
            where:{
                conversationId:conversationId
            },
            include:{
                sender:{
                    select:{
                        id:true,
                        name:true,
                        email:true,
                    }
                }
            },
            orderBy:{
                createdAt:'desc'
            }
        })

    } catch (error) {
        throw new Error("Error while fetching all the conversation message" + error)
    }
}