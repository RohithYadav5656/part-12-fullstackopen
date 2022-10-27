import { SetUserDataAction, User } from "../type";
import * as actionTypes from "./actionTypes";

export const setUserData = (user: User): SetUserDataAction => ({
    type: actionTypes.SET_USER_DATA,
    data: {
        user
    }
})