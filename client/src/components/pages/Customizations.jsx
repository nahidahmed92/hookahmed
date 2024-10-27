import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../UI/CartContext.jsx';
import logo from '../../assets/logo.png';

export default function Customizations({ currentHookah, setCurrentHookah }) {
  const navigate = useNavigate();
  const { addToCart, cartItems, updateCartItem } = useCart();

  // Array of customization objects
  const customizations = [
    { name: 'Ice Base', description: 'This is where the customization description will go.' },
    { name: 'Fruit Base', description: 'This is where the customization description will go.' },
  ];

  // Check if customization is already selected
  const isCustomizationAdded = (customizationName) => {
    return currentHookah.customizations.includes(customizationName);
  };

  const handleAddBtn = (customizationName) => {
    let updatedCustomizations;
    if (isCustomizationAdded(customizationName)) {
      // Remove flavor if it's already selected
      updatedCustomizations = currentHookah.customizations.filter(
        (customization) => customization !== customizationName
      );
    } else {
      // Add flavor if it's not selected
      updatedCustomizations = [...currentHookah.customizations, customizationName];
    }

    const updatedHookah = {
      ...currentHookah,
      customizations: updatedCustomizations,
      type: 'PendingHookah',
    };

    // Update currentHookah
    setCurrentHookah(updatedHookah);
    // Add pending hookah to localStorage
    localStorage.setItem('pendingHookah', JSON.stringify(updatedHookah));

    // Add or update the pending hookah in the cart
    if (!cartItems.some((item) => item.type === 'PendingHookah')) {
      addToCart(updatedHookah);
    } else {
      // Update the existing pending hookah in the cart
      updateCartItem(updatedHookah, 'PendingHookah');
    }
  };

  useEffect(() => {
    // Redirect if no flavors are selected
    if (currentHookah.flavors.length === 0) {
      navigate('/menu/flavor');
    }
    // Redirect if no hookah is selected
    else if (!currentHookah.hookah) {
      navigate('/menu/flavor/hookah');
    }
    // Redirect if no base is selected
    else if (!currentHookah.base) {
      navigate('/menu/flavor/hookah/base');
    }
  }, [currentHookah, navigate]);

  const handlePrevBtn = () => {
    navigate('/menu/flavor/hookah/base');
  };

  // Finalize the hookah order
  const handleAddToCart = () => {
    // Finalize the pending hookah and turn it into a HookahOrder
    const finalizedHookah = {
      ...currentHookah,
      // Mark it as a finalized hookah order
      type: 'HookahOrder',
    };

    // Update the cart by replacing the pending hookah with the finalized hookah
    // Replace the PendingHookah with HookahOrder
    updateCartItem(finalizedHookah, 'PendingHookah');

    // Reset currentHookah for the next hookah order
    setCurrentHookah({
      flavors: [],
      hookah: '',
      base: '',
      customizations: [],
    });

    localStorage.removeItem('pendingHookah');

    // Navigate back to the menu
    navigate('/menu');
  };

  return (
    <>
      <h1>Customizations</h1>
      <p>Hear you can select customizations and add a note.</p>
      <div className="d-flex flex-column align-items-center">
        {customizations.map((customization) => (
          <div className="card mb-3" style={{ maxWidth: '540px' }} key={customization.name}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={logo} className="img-fluid rounded-start" alt={customization.name} />
              </div>
              <div className="col-md-8 d-flex flex-column">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-start align-items-left">
                    {customization.name}
                  </h5>
                  <p className="card-text d-flex justify-content-start text-start">
                    {customization.description}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end mx-2 mb-2">
                  <button
                    className="btn-add btn btn-primary w-25"
                    onClick={() => handleAddBtn(customization.name)}>
                    {isCustomizationAdded(customization.name) ? 'Remove' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation and Add to Cart Buttons */}
      <div className="mt-3">
        <button className="btn-nav btn btn-primary me-2 w-25" onClick={handlePrevBtn}>
          Previous
        </button>
        <button className="btn-nav btn btn-primary ms-2 w-25" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </>
  );
}
