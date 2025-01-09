import { NextFunction, Request, Response } from "express";
import { IJwtPayloadWithId } from "../interfaces";
import prisma from "../prisma-client";
import * as jwt from "jsonwebtoken";


const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret = process.env.SECRET_KEY as string;

    console.log("")

    if (!token) {
        res.status(401).json({ message: 'Authorization token is required.' });
        return;
    }
    try {
        const decoded = jwt.verify(token as string, secret) as IJwtPayloadWithId;
        if (!decoded.id) {
            res.status(401).json({ message: 'Invalid token payload.' });
            return;
        }
        const user = await prisma.user.findFirst({ where: { id: decoded.id } });
        if (!user) {
            res.status(401).json({ message: 'User not found.' });
            return;
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token.' });
        return;
    }
};

export default authMiddleware;