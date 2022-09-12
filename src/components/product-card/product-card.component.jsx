import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
} from './product-card.style';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.actions';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
                <Button
                    buttonType={BUTTON_TYPES_CLASSES.inverted}
                    onClick={() => dispatch(addItemToCart(cartItems, product))}
                >
                Add to card
            </Button>
        </ProductCartContainer>
    );
}

export default ProductCard;