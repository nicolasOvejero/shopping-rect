import { createContext, useEffect, useState } from "react";

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, currentItem) => {
            return total + currentItem.quantity;
        }, 0);
        setCartCount(newCartCount);
    }, [ cartItems ]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, currentItem) => {
            return total + (currentItem.quantity * currentItem.price);
        }, 0);
        setCartTotal(newCartTotal);
    }, [ cartItems ]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    };

    const clearItemFromCart = (productToRemove) => {
        setCartItems(clearCartItem(cartItems, productToRemove));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemToCart, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};