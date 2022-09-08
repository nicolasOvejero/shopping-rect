import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const gotToCheckoutHandler = () => {
        navigate('/checkout');
    }
    
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                { cartItems.map((item) => <CartItem cartItem={item} />) }
            </div>
            <Button onClick={gotToCheckoutHandler}>CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;