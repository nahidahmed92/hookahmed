import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const NavigationContext = createContext();

// Create a provider component
export function NavigationProvider({ children }) {
  const navigate = useNavigate(); // This is inside the Router context
  return <NavigationContext.Provider value={{ navigate }}>{children}</NavigationContext.Provider>;
}

// Custom hook to use the navigate context
export function useNavigation() {
  return useContext(NavigationContext);
}
