import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import prismaDb from "@/libs/prismadb";

export default async function(req: NextApiRequest, res: NextApiResponse) {
    
    if(req.method !== 'POST'){
        return res.status(405).end();
    }

    try {
        const { email, username, name, password } = req.body;
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prismaDb.user.create({
            data: {
                email, 
                username, 
                name, 
                hashedPassword
            }
        });

        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(400).end();
    }
}