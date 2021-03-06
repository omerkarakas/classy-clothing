import './checkout.styles.scss';

import { useContext } from "react";
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';


const Checkout = () => {

  const { cartItems, cartTotal } = useContext(CartContext);
  
  return (
    <div className="checkout-container">
      <div className="checkout-header" >
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>


      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
            
        // <div key={id}>
        //   <h2>{name}</h2>
        //   <span>{quantity}</span>
        //   <br/>
        //   <span onClick={() => removeItemFromCart(item)}>decrement</span>
        //   <br/>
        //   <span onClick={() => addItemToCart(item)}>increment</span>
        // </div>
      ))}
      <span className="total">Total: ${ cartTotal }</span>
      
    </div>

  );
};


export default Checkout;