import { Request, Response } from 'express';
import prisma from '../prisma-client';


export const getUserProfileName = async (req: Request, res: Response) => {

    try {
        const id = +req.params.id;
        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        if(!user) {
            res.status(404).json({message: "User with this id not found"});
            return;
        }
        res.status(200).json({userName: user.user_name})
    } catch (err: unknown) {
        console.log(err)
    }
}
