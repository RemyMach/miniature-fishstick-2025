import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../db/database";
import { Token } from "../db/models/token";
import { verify } from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader === undefined) {
            res.status(401).send({ "message": "Unauthorized" })
            return
        }

        const bearerSplit = authHeader.split(' ')
        if (bearerSplit.length < 2) {
            res.status(401).send({ "message": "Unauthorized" })
            return
        }
        const token = bearerSplit[1];

        const tokenRepo = AppDataSource.getRepository(Token)
        const tokenFound = tokenRepo.findOne({ where: { token } })
        if (tokenFound === null) {
            res.status(403).send({ "message": "Access Forbidden" })
            return
        }

        verify(token, "valuerandom", (err, user) => {
            if (err) {
                res.status(403).send({ "message": "Access Forbidden" })
                return
            }
            // https://www.geeksforgeeks.org/express-js-res-locals-property/
            (req as any).user = user;
            next();
        })


    } catch (error) {

    }
}