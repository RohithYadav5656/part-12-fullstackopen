import { Response } from "express";
import { body, param, query } from "express-validator";
import { createNewItem, deleteItem, editItem, getAllItems, getItem, getUnlockedItems } from "../logic/projects";
import { handleErrors } from "../utils/handleErrorsMiddleware";
import { ProjectRequest } from "./singleProjectRouter";
import Router from "express-promise-router";
import { optionalAuthentication, requireAdminToProject, requireAuthentication } from "../utils/authUtils";
import { UnauthorizedError } from "../utils/errors";

const itemsRouter = Router({ mergeParams: true });
itemsRouter.use(handleErrors)

itemsRouter.get("/",
    optionalAuthentication, // Auth is not mandatory here, because this path should be public. Auth should only be required if includeLocked==true
    query("includeLocked").optional().isBoolean().toBoolean(),
    handleErrors,
    async (req: ProjectRequest, res: Response) => {
        const projectId = req.project!.id;
        if (req.query.includeLocked) {
            if (!req.user) throw UnauthorizedError
            res.json(await getAllItems(req.project!, req.user._id))
        }
        else {
            res.json(await getUnlockedItems(projectId));
        }
    })

itemsRouter.post("/",
    requireAuthentication,
    body("data").exists(),
    body("unlockDate").isISO8601().toDate(),
    handleErrors,
    async (req: ProjectRequest, res: Response) => {
        res.json(await createNewItem(req.body.data, req.body.unlockDate, req.user!._id, req.project!));
    })

itemsRouter.put("/:itemId",
    requireAuthentication,
    param("itemId").isMongoId().withMessage("Malformed item ID"),
    body("data").optional(),
    body("unlockDate").optional().isISO8601().toDate(),
    handleErrors,
    async (req: ProjectRequest, res: Response) => {
        const itemId = req.params.itemId;
        let changes: { [key: string]: string } = {};
        if (req.body.hasOwnProperty("data")) changes.data = req.body.data;
        if (req.body.hasOwnProperty("unlockDate")) changes.unlockDate = req.body.unlockDate;

        res.json(await editItem(itemId, changes, req.user!._id))
    }
)

itemsRouter.delete("/:itemId",
    requireAuthentication,
    requireAdminToProject,
    param("itemId").isMongoId().withMessage("Malformed item ID"),
    handleErrors,
    async (req: ProjectRequest, res: Response) => {
        res.json(await deleteItem(req.params.itemId, req.user!._id))
    }
)

export default itemsRouter;