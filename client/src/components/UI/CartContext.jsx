import { createContext, useState, useContext } from 'react';
import { useNavigation } from './NavigationContext.jsx';

// Create the context
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children, resetCurrentHookah }) {
  const [cartItems, setCartItems] = useState([]);
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
        newCartItems[itemIndex] = item; // Replace the old PendingHookah with updated one
        setCartItems(newCartItems);
      }
    }
  };

  const updateCartItem = (updatedItem, type) => {
    setCartItems((prevItems) => prevItems.map((item) => (item.type === type ? updatedItem : item)));
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
    resetCurrentHookah();
    navigate('/menu');
  };

  const clearCart = () => {
    setCartItems([]);
    resetCurrentHookah();
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
