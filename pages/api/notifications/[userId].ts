import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismaDb from "@/libs/prismadb";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method !== 'GET') {
        res.status(405).end();
    }

    try {

        const { userId } = req.query;

        if(!userId || typeof userId !== 'string') {
            throw new Error("Invalid Id");
        }

        const notifications = await prismaDb.notification.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        await prismaDb.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false
            }
        })

        return res.status(200).json(notifications)

    } catch (error) {
        res.status(400).end();
    }
}