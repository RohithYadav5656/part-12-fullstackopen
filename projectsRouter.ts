import { body } from "express-validator";
import { createProject, getAllProjects } from "../logic/projects";
import { requireAuthentication, UserRequest } from "../utils/authUtils";
import singleProjectRouter from "./singleProjectRouter";
import { handleErrors } from "../utils/handleErrorsMiddleware";
import Router from "express-promise-router";

const projectsRouter = Router({ mergeParams: true });
projectsRouter.use("/:projectId", singleProjectRouter);

projectsRouter.get("/",
    requireAuthentication,
    async (req: UserRequest, res) => {
        res.json(await getAllProjects(req.user!._id));
    })

projectsRouter.post("/",
    requireAuthentication,
    body("projectName").notEmpty(),
    body("items"),
    handleErrors,
    async (req: UserRequest, res) => {
        const newProject = await createProject(req.body.projectName, req.user!._id, req.body.items);
        res.json(newProject);
    })

export default projectsRouter;