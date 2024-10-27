import { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { useNavigation } from './NavigationContext.jsx';

// Create the context
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children, resetCurrentHookah }) {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart items from localStorage, if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const { navigate } = useNavigation();

  const addToCart = (item) => {
    // Assign unique ID
    const newItem = { ...item, id: uuid() };

    if (newItem.type === 'Drink') {
      // Handle drinks with quantity updates
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.name === newItem.name && cartItem.type === newItem.type
      );
      if (itemIndex > -1) {
        const newCartItems = [...cartItems];
        newCartItems[itemIndex].quantity += 1;
        setCartItems(newCartItems);
      } else {
        setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
      }
    } else if (newItem.type === 'HookahOrder' || newItem.type === 'PendingHookah') {
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.type === newItem.type);
      if (newItem.type === 'PendingHookah' && itemIndex > -1) {
        const newCartItems = [...cartItems];
        newCartItems[itemIndex] = newItem;
        setCartItems(newCartItems);
        localStorage.setItem('pendingHookah', JSON.stringify(newItem));
      } else {
        setCartItems([...cartItems, newItem]);
      }
    }
  };

  const updateCartItem = (updatedItem, type) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.type === type ? updatedItem : item)));
  };

  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    const updatedCartItems = cartItems.filter((item) => item.id !== id);

    // Handle specific logic based on item type
    if (itemToRemove.type === 'PendingHookah') {
      localStorage.removeItem('pendingHookah');
      resetCurrentHookah();
    } else if (itemToRemove.type === 'Drink') {
      console.log('Drink Removed');
    } else if (itemToRemove.type === 'HookahOrder') {
      console.log('Completed Hookah Removed');
    }

    // Update cart items
    setCartItems(updatedCartItems);

    // Redirect if cart is empty
    if (updatedCartItems.length === 0) {
      console.log('Cart is Empty');
      navigate('/menu');
    }
  };

  // Set updated cart items
  // setCartItems(updatedCartItems);

  // if (updatedCartItems.length === 0) {
  //   navigate('/menu');
  // }

  const clearCart = () => {
    setCartItems([]);
    resetCurrentHookah();
    // this might night be needed
    localStorage.removeItem('cart');
    localStorage.removeItem('pendingHookah');
    navigate('/menu');
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart context
export function useCart() {
  return useContext(CartContext);
}
