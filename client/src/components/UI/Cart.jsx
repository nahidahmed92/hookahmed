import { useState } from 'react';
import { useCart } from './CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  // Group items by type
  const drinks = cartItems.filter((item) => item.type === 'Drink');
  // Pending Hookah is a current hookah order when a client is ordering
  const pendingHookah = cartItems.find((item) => item.type === 'PendingHookah');
  // Hookah Orders is the finalized order.
  const hookahOrders = cartItems.filter((item) => item.type === 'HookahOrder');

  // Combine pending hookah with hookah orders for display
  const allHookahOrders = [...hookahOrders];
  if (pendingHookah) {
    // Treat pending hookah as a hookah order in the display
    allHookahOrders.push(pendingHookah);
  }

  return (
    <div className="cart-container text-black">
      <button onClick={toggleCart} className="btn btn-outline-primary">
        <i className="bi bi-cart"></i> ({cartItems.length})
      </button>

      {isOpen && (
        <div className="cart-modal">
          <div className="cart-modal-content p-3">
            <h3>Your Cart</h3>
            {/* Hookah Orders Section */}
            {allHookahOrders.length > 0 && (
              <>
                {allHookahOrders.map((order, index) => (
                  <div key={index}>
                    <h4>Hookah #{index + 1}</h4>
                    <ul className="list-unstyled">
                      <li className="flex-column text-start">
                        <strong>Flavors:</strong>
                        <ul>
                          {order.flavors && order.flavors.length > 0 ? (
                            order.flavors.map((flavor, flavorIndex) => (
                              <li key={flavorIndex}>- {flavor}</li>
                            ))
                          ) : (
                            <li>-</li>
                          )}
                        </ul>
                      </li>
                      <li className="flex-column text-start">
                        <strong>Hookah:</strong>- {order.hookah}
                      </li>
                      <li className="flex-column text-start">
                        <strong>Base:</strong>- {order.base}
                      </li>
                      {/* Here we remove Customization completely */}
                      {/* {order.customizations.length > 0 && ( */}
                      <li className="flex-column text-start">
                        <strong>Customizations:</strong>
                        {/* Here we add text None if there isn't any customizations */}
                        {order.customizations.length > 0 ? (
                          <ul>
                            {order.customizations.map((customization, customizationIndex) => (
                              <li key={customizationIndex}>- {customization}</li>
                            ))}
                          </ul>
                        ) : (
                          <span>- none</span>
                        )}
                      </li>
                      {/* )} */}
                    </ul>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="btn btn-sm btn-outline-danger mb-2">
                      Remove Hookah #{index + 1}
                    </button>
                  </div>
                ))}
              </>
            )}
            {/* Drinks Section */}
            {drinks.length > 0 && (
              <>
                <h4>Drinks</h4>
                <ul className="list-unstyled">
                  {drinks.map((item, index) => (
                    <li
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-2">
                      {item.name} - {item.quantity}
                      <button
                        onClick={() => removeFromCart(index)}
                        className="btn btn-sm btn-outline-danger mb-1">
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {/* Empty Cart Message */}
            {cartItems.length === 0 && <p>Your cart is empty</p>}
            {/* Cart Control Buttons */}
            <button onClick={clearCart} className="btn btn-danger mt-2 mx-1">
              Clear Cart
            </button>
            <button onClick={toggleCart} className="btn btn-secondary mt-2 mx-1">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
