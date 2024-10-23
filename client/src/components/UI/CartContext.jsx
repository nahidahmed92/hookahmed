import { createContext, useState, useContext } from 'react';

// Create the context
const CartContext = createContext();

// Create a provider component
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

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
    }
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the Cart context
export function useCart() {
  return useContext(CartContext);
}
