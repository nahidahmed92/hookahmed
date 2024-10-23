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
    const updatedHookah = {
      ...currentHookah,
      customizations: [...currentHookah.customizations, customizationName],
      type: 'PendingHookah',
    };

    // Update currentHookah
    setCurrentHookah(updatedHookah);

    // Add or update the pending hookah in the cart
    if (!cartItems.some((item) => item.type === 'PendingHookah')) {
      addToCart(updatedHookah);
    } else {
      // Update the existing pending hookah in the cart
      updateCartItem(updatedHookah, 'PendingHookah');
    }
  };

  // Function to complete the current hookah order
  const completeCurrentHookah = () => {
    addToCart({
      ...currentHookah,
      type: 'HookahOrder',
    });

    // Reset current hookah for the next order
    setCurrentHookah({
      flavors: [],
      hookah: '',
      base: '',
      customizations: [],
    });
    navigate('/menu');
  };

  const handlePrevBtn = () => {
    navigate('/menu/flavor/hookah/base');
  };

  // Finalize the hookah order
  const handleAddToCart = () => {
    // Add currentHookah to cart and reset currentHookah
    completeCurrentHookah();
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
                  <p className="card-text d-flex justify-content-start">
                    {customization.description}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end mx-2 mb-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddBtn(customization.name)}
                    disabled={isCustomizationAdded(customization.name)}>
                    {isCustomizationAdded(customization.name) ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation and Add to Cart Buttons */}
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={handlePrevBtn}>
          Previous
        </button>
        <button className="btn btn-primary mx-2" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </>
  );
}
