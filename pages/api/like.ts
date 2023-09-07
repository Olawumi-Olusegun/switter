import prismaDb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";


export default async function(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { postId } = req.body;

        // const postId = req.method === 'POST' ? req.body.userId : req.query.userId;
        // const { currentUser }: any = serverAuth(req, res);
        
        const { currentUser }: any = serverAuth(req, res);
        if(!postId || typeof postId !== 'string') {
            throw new Error("Invalid Id");
        }

        const post = await prismaDb.post.findUnique({
            where: {
                id: postId
            }
        });

        if(!post) {
            throw new Error("Invalid Id");
        }

        let updatedLikedIds = [...(post?.likedIds || [])];

        if(req.method === 'POST') {
            updatedLikedIds.push(currentUser?.id);

            try {
                const post = await prismaDb.post.findUnique({
                    where: {
                        id: postId,
                    }
                });
                if(post?.userId) {
                    await prismaDb.notification.create({
                        data: {
                            body: "Someone liked your tweet",
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
        }

        if(req.method === 'DELETE') {
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);
        }

        const updatedPost = await prismaDb.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return res.status(200).json(updatedPost);

    } catch (error) {
        return res.status(400).end();
    }
}