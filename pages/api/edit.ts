import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismaDb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'PATCH') {
        return res.status(405).end();
    }



    try {

        const { currentUser }: any = await serverAuth(req, res);

        console.log({currentUser})

        const { name, username, bio, profileImage, coverImage } = req.body;

        console.log({
            name, 
            username, 
            bio, 
            profileImage, 
            coverImage
        });

        if(!name || !username) {
            throw new Error("Missing fields");
        }
        const updatedUser = await prismaDb.user.update({
            where: {
                id: currentUser?.id
            },
            data: {
                name, 
                username, 
                bio, 
                profileImage, 
                coverImage
            }
        });

        return res.status(200).json(updatedUser);
        

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}