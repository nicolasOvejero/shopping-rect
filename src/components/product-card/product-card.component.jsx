import {
    ProductCartContainer,
    Footer,
    Name,
    Price,
} from './product-card.style';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext);

    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
                <Button
                    buttonType={BUTTON_TYPES_CLASSES.inverted}
                    onClick={() => addItemToCart(product)}
                >
                Add to card
            </Button>
        </ProductCartContainer>
    );
}

export default ProductCard;