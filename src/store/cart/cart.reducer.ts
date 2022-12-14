import { CartItem } from "./cart.types";
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.actions";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

export const CART_INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (
    state = CART_INITAL_STATE,
    action = {} as AnyAction
): CartState => {
    if (setIsCartOpen.match(action)) {
        return {
            ...state, 
            isCartOpen: action.payload
        };
    }

    if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        }
    }
    return state;
}