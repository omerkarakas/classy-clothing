import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import { ShoppingIcon, CartIconContainer, ItemCount
} from './cart-icon.styles';


const CartIcon = () => {
  const { cartCount , isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  
  // const cartItemsCount = () => {
  //   return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  // }
  
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon;