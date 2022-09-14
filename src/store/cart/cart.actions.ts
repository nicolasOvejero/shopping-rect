import { ActionWithPaylopad, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../category/category.types";
import { CartItem, CART_ACTIONS_TYPES } from "./cart.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem) => {
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

const clearCartItem = (cartItems: CartItem[], productToClear: CategoryItem) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export type SetIsCartOpen = ActionWithPaylopad<
  CART_ACTIONS_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPaylopad<
  CART_ACTIONS_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems)
);
  
export const addItemToCart = (cartItems: CartItem[], productToAdd: CartItem) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItem);
};

export const removeItemToCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItem = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItem);
};

export const clearItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItem = clearCartItem(cartItems, productToRemove);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItem);
};
