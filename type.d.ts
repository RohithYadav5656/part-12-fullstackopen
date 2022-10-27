import { ActionCreator } from "redux";
import * as actionTypes from "./store/actionTypes";

export interface LoginToken {
    token: string;
    username: string;
    id: string;
}

export interface Project {
    _id: string;
    name: string;
    items: Item[];
    admin: string;
    description?: string;
}

export interface Item extends NewItem {
    _id: string;
    data: string;
    unlockDate: Date;
    project: string;
    admin: string;
}

export interface SetUserDataAction {
    type: "SET_USER_DATA";
    data: {
        user: User;
    }
}

export interface User {
    username: string;
    _id: string;
}

export type ActionCreator = SetUserDataAction;

export type DispatchType = (args: ActionCreator) => ActionCreator;

export type NewItem = Pick<Item, "data" | "unlockDate">