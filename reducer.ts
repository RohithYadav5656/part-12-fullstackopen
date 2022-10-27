import { ActionCreator } from "../type";
import * as actionTypes from "./actionTypes";

export interface User {
    username: string;
    _id: string;
}

export interface AppState {
    user: User;
}

const initialState: AppState = {
    user: {
        username: "",
        _id: ""
    }
}

export const reducer = (state: AppState = initialState, action: ActionCreator): AppState => {
    switch (action.type) {
        case actionTypes.SET_USER_DATA:
            return {
                ...state,
                user: action.data.user
            }
    }

    return state;
}