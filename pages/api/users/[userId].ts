import prismaDb from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET") {
        return res.status(405).end();
    }
    const { userId } = req.query;

    if(!userId || typeof userId !== 'string') {
        throw new Error("Invalid Id")
    }

    try {
        const existingUser = await prismaDb.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                email: true,
                emailVerified: true,
                image: true,
                coverImage: true,
                profileImage: true,
                createdAt: true,
                updatedAt: true,
                followingIds: true,
                hasNotification: true,
            }
        });

        const followersCount = await prismaDb.user.count({
            where: {
                followingIds: {
                    has: userId,
                }
            }
        });
        
        return res.status(200).json({ ...existingUser, followersCount })
        
    } catch (error) {
        
    }
}