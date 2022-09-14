import { CategoryItem } from "../category/category.types";

export enum CART_ACTIONS_TYPES {
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN'
}

export type CartItem = CategoryItem & {
    quantity: number;
};
  