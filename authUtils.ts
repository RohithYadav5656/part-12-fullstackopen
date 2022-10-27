import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../data/User";
import { ProjectRequest } from "../routes/singleProjectRouter";
import { LogInAgainError, MissingPermissionsToProjectError, NoProjectFoundError, UnauthorizedError } from "./errors";

export interface TokenUser {
    username: string;
    _id: string;
}

export interface UserRequest extends Request {
    user?: TokenUser
}

export const optionalAuthentication = (req: UserRequest, res: Response, next: NextFunction) => {
    const authToken = req.header("Authorization")
    if (authToken) {
        const token = authToken.startsWith("Bearer ") ? authToken.substring(7) : authToken;
        const decodedUser = <TokenUser>jwt.verify(token, String(process.env.SECRET))
        req.user = decodedUser
    }
    next();
}

export const requireAuthentication = async (req: UserRequest, res: Response, next: NextFunction) => {
    const authToken = req.header("Authorization")
    if (!authToken) throw UnauthorizedError;

    const token = authToken.startsWith("Bearer ") ? authToken.substring(7) : authToken;
    const decodedUser = <TokenUser>jwt.verify(token, String(process.env.SECRET))

    if (await User.exists({ _id: decodedUser._id })) {
        req.user = decodedUser
    }
    else {
        // This happens if the user is deleted while its token is still active
        throw LogInAgainError;
    }
    
    next();
}

export const requireAdminToProject = (req: ProjectRequest, res: Response, next: NextFunction) => {
    if (!req.user) throw UnauthorizedError;
    if (!req.project) throw NoProjectFoundError;

    const userIsAdmin = String(req.project.admin) === String(req.user._id);
    if (!userIsAdmin) throw MissingPermissionsToProjectError;

    next();
}