import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem =
     cartItems.find(item => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ?
        { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  }
 
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {

  const existingCartItem =
    cartItems.find(item => item.id === productToRemove.id);
  
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
  }

  return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    )  
  
  
}


const removeCartItemRow = (cartItems, productToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  removeCartRow: () => { },
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);    
   }, [cartItems]);
  
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const removeCartRow = (productToRemove) => {
    setCartItems(removeCartItemRow(cartItems, productToRemove));
  }

  const value = { isCartOpen, setIsCartOpen, addItemToCart,removeItemFromCart, removeCartRow, cartItems, cartCount };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}