import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { HttpException } from "./HttpException";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof HttpException) {
        if (err.message) {
            res.status(err.status).json({ error: err.message })
        }
        else {
            res.sendStatus(err.status);
        }
    }
    else if (err instanceof TokenExpiredError) {
        res.status(401).json({ error: "Your login token has expired. Log in again." })
    }
    else {
        res.status(500).json({ error: err.message })
    }
}