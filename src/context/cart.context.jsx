import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

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

const INITAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CART_ACTIONS_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTIONS_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
            case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
                return {
                    ...state,
                    isCartOpen: payload,
                }
            default:
            throw new Error(`Unhandle type ${type} in cartReducer`);
    }
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({children}) => {
    const [ { cartItems, isCartOpen, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, currentItem) => {
            return total + currentItem.quantity;
        }, 0);

        const newCartTotal = newCartItems.reduce((total, currentItem) => {
            return total + (currentItem.quantity * currentItem.price);
        }, 0);


        dispatch(
            createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, { 
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            })
          );
    }

    const addItemToCart = (productToAdd) => {
        const newCartItem = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItem);
    };

    const removeItemToCart = (productToRemove) => {
        const newCartItem = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItem);
    };

    const clearItemFromCart = (productToRemove) => {
        const newCartItem = clearCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItem);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};