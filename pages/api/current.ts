import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    if(req.method !== 'GET') {
        res.status(405).end();
    }

    try {
        
        const { currentUser }: any = await serverAuth(req, res);

        return res.status(200).json(currentUser)

    } catch (error) {
        res.status(400).end();
    }
}