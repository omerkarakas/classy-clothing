//import { } from './cart-item.styles';
import * as sc from './cart-item.styles';


const CartItem = ({cartItem}) => {
  const {name,imageUrl, price, quantity} = cartItem;
  return (
    <sc.CartItemContainer>
      <img src={imageUrl} alt={name}/>
      <sc.CartItemDetails>
        <span className="name">{name}</span>

        <span className="price">{quantity} x ${price}</span>

      </sc.CartItemDetails>
    </sc.CartItemContainer>
  );
}

export default CartItem;