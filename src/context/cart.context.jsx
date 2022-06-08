import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';

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


const clearCartItem = (cartItems, productToRemove) => {
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}


export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  clearItemFromCart: () => { },
  cartCount: 0,
  cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}
const INITIAL_STATE = { 
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };

    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }

}


export const CartProvider = ({ children }) => {
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch]
    = useReducer(cartReducer, INITIAL_STATE);

  // useEffect(() => {
  //   const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  //   setCartCount(count);    
  // }, [cartItems]);
  
  // useEffect(() => {
  //   const sum = cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0);
  //   setCartTotal(sum);    
  //  }, [cartItems]);
    
const updateCartItemReducer = (newCartItems) => {

  const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const newCartTotal = cartItems.reduce((acc, item) => acc + item.quantity*item.price, 0);

  // dispatch({
  //   type: CART_ACTION_TYPES.SET_CART_ITEMS,
  //   payload: {
  //     cartItems: newCartItems,
  //     cartTotal: newCartTotal,
  //     cartCount: newCartCount
  //   }
  // });
  dispatch(
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
    {
      cartItems: newCartItems,
      cartTotal: newCartTotal,
      cartCount: newCartCount
    }));
  
}
  
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  }

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems);
  }

  const clearItemFromCart = (productToRemove) => {
    const newCartItems = clearCartItem(cartItems, productToRemove);
    updateCartItemReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ));
  }

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}