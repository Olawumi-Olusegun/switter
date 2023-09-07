import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import prismaDb from "./prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const session = await getSession({req});

        const session = await getServerSession(req, res, authOptions);
        
        if(!session?.user?.email) {
            throw new Error("Not signed in")
        }

        const currentUser = await prismaDb.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if(!currentUser) {
            throw new Error("Not signed in")
        }

        return { currentUser };


    } catch (error) {
        console.log(error)
    }
}

export default serverAuth;