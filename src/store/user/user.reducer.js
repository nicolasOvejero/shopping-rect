import { USER_ACTIONS_TYPES } from "./user.types";

const INITAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTIONS_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
};
