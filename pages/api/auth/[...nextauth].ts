import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prismaDb from '@/libs/prismadb';

// export default async function auth(req: NextApiRequest, res: NextApiResponse) {

//     return await NextAuth(req, res, {
//         adapter: PrismaAdapter(prismaDb),
//         session: {
//             strategy: 'jwt',
//         },
//     providers: [
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'email', type: 'text'},
//                 password: { label: 'password', type: 'password'},
//             },
//             async authorize(credentials) {
//                 if(!credentials?.email || !credentials?.password) {
//                     throw new Error("Invalid credentials")
//                 }
                
//                 const user = await prismaDb.user.findUnique({
//                     where: {
//                         email: credentials.email
//                     }
//                 });

//                 if(!user || !user?.hashedPassword) {
//                     throw new Error("Invalid credentials")
//                 }

//                 const isCorrectPassword = await bcrypt.compare(credentials.password, user?.hashedPassword);

//                 if(!isCorrectPassword) {
//                     throw new Error("Invalid credentials")
//                 }

//                 return user;

//             }
//         })
//     ],

//     secret: process.env.NEXTAUTH_SECRET,


//     })
// }


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prismaDb),
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: 'email', type: 'text' },
          password: { label: 'password', type: 'password' }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid credentials');
          }
  
          const user = await prismaDb.user.findUnique({
            where: {
              email: credentials.email
            },
            
          });
  
          if (!user || !user?.hashedPassword) {
            throw new Error('Invalid credentials');
          }
  
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
  
          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }
  
          return user;
        }
      })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
      strategy: 'jwt',
    },
    jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  export default NextAuth(authOptions);