import { NextFunction, Response } from "express";
import { param } from "express-validator";
import Project, { IProject } from "../data/Project";
import { requireAuthentication, requireAdminToProject, UserRequest } from "../utils/authUtils";
import { NoProjectFoundError } from "../utils/errors";
import { handleErrors } from "../utils/handleErrorsMiddleware";
import itemsRouter from "./itemsRouter";
import Router from "express-promise-router";
import { deleteProject, getProject } from "../logic/projects";

export interface ProjectRequest extends UserRequest {
    project?: IProject;
}

const singleProjectRouter = Router({ mergeParams: true })

const extractProjectMiddleware = async (req: ProjectRequest, res: Response, next: NextFunction) => {
    const project = await Project.findById(req.params.projectId).populate("items");
    if (!project) throw NoProjectFoundError;

    req.project = project;

    next();
}

singleProjectRouter.use("/",
    param("projectId").isMongoId().withMessage("Malformed project id"),
    handleErrors,
    extractProjectMiddleware);

singleProjectRouter.get("/",
    requireAuthentication,
    requireAdminToProject,
    async (req: ProjectRequest, res) => {
        res.json(await getProject(req.project?.id, req.user!._id))
    })

singleProjectRouter.delete("/",
    requireAuthentication,
    requireAdminToProject,
    async (req: ProjectRequest, res) => {
        res.json(await deleteProject(req.project?.id, req.user!._id))
    })

singleProjectRouter.use("/items", itemsRouter)

export default singleProjectRouter;