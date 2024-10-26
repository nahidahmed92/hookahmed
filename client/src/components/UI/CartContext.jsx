import { createContext, useContext, useEffect, useState } from 'react';
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
    if (item.type === 'Drink') {
      // Handle drinks with quantity updates
      const itemIndex = cartItems.findIndex(
        (cartItem) => cartItem.name === item.name && cartItem.type === item.type
      );
      if (itemIndex > -1) {
        // Item already in the cart, update quantity
        const newCartItems = [...cartItems];
        newCartItems[itemIndex].quantity += 1;
        setCartItems(newCartItems);
      } else {
        // Item not in the cart, add as new entry
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
    } else if (item.type === 'HookahOrder') {
      // Add hookah order as a whole without quantity updates
      setCartItems([...cartItems, item]);
    } else if (item.type === 'PendingHookah') {
      // Handle PendingHookah separately
      const itemIndex = cartItems.findIndex((cartItem) => cartItem.type === 'PendingHookah');

      if (itemIndex === -1) {
        // If no PendingHookah exists, add as a new entry
        setCartItems([...cartItems, item]);
      } else {
        // If PendingHookah exists, update it
        const newCartItems = [...cartItems];
        // Replace the old PendingHookah with updated one
        newCartItems[itemIndex] = item;
        setCartItems(newCartItems);
      }
      // Save PendingHookah separately to localStorage
      localStorage.setItem('pendingHookah', JSON.stringify(item));
    }
  };

  const updateCartItem = (updatedItem, type) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.type === type ? updatedItem : item)));
  };

  const removeFromCart = (index) => {
    const itemToRemove = cartItems[index];

    // Filter out the item from cartItems
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);

    if (itemToRemove.type === 'Drink') {
      setCartItems(updatedCartItems);
    }

    // If the removed item is PendingHookah, clear from localStorage, reset current hookah
    if (itemToRemove.type === 'PendingHookah') {
      localStorage.removeItem('pendingHookah');
      resetCurrentHookah();
      navigate('/menu');
    }

    if (itemToRemove.type === 'HookahOrder') {
      setCartItems(updatedCartItems);
    }

    if (updatedCartItems.length === 0) {
      navigate('/menu');
    }
  };

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
