import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismaDb from "@/libs/prismadb";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method !== 'POST') {
        res.status(405).end();
    }

    try {
        
        const { currentUser }: any = await serverAuth(req, res);

        const { body } = req.body;

        const { postId } = req.query;

        if(!postId || typeof postId !== 'string') {
            throw new Error("Invalid Id");
        }

        const comment = await prismaDb.comment.create({
            data: {
                body,
                userId: currentUser?.id,
                postId
            }
        });

        try {
            const post = await prismaDb.post.findUnique({
                where: {
                    id: postId,
                }
            });


            if(post?.userId) {
                await prismaDb.notification.create({
                    data: {
                        body: "Someone replied to your tweet",
                        userId: post?.userId
                    }
                });

                await prismaDb.user.update({
                    where: {
                        id: post?.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
            
        } catch (error) {
            
        }

        return res.status(200).json(comment)

    } catch (error) {
        res.status(400).end();
    }
}