import { useContext } from 'react';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { CartContext } from '../../context/cart.context';

import {ProductCardContainer,ProductCardImage,ProductCardButton,ProductCardFooter } from './product-card.styles';


const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);
 
  return (
    <ProductCardContainer>
      <ProductCardImage src={imageUrl} alt={`${name}`} />
      <ProductCardFooter>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </ProductCardFooter>
      <ProductCardButton onClick={addProductToCart}>Add to Card</ProductCardButton>
      {/* <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to Card</Button> */}
    </ProductCardContainer>
  );
}


export default ProductCard;