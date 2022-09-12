import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTIONS_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [ ...cartItems, { ...productToAdd, quantity: 1 } ];
};

const removeCartItem = (cartItems, productToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToRemove.id
    );

    if (existingCartItem && existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToRemove.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        );
    }

    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
};

const clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const setIsCartOpen = (boolean) => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItem);
};

export const removeItemToCart = (cartItems, productToRemove) => {
    const newCartItem = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItem);
};

export const clearItemFromCart = (cartItems, productToRemove) => {
    const newCartItem = clearCartItem(cartItems, productToRemove);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItem);
};
