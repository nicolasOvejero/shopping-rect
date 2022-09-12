import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from './checkout-item.style';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { clearItemFromCart, addItemToCart, removeItemToCart } from '../../store/cart/cart.actions';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const disptach = useDispatch();

  const clearItemHandler = () => disptach(clearItemFromCart(cartItems, cartItem));
  const addItemHandler = () => disptach(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () => disptach(removeItemToCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan> {price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
