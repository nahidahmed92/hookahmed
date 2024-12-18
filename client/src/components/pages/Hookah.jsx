import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../UI/CartContext.jsx';
import logo from '../../assets/logo.png';

export default function Hookah({ currentHookah, setCurrentHookah }) {
  const navigate = useNavigate();
  const { addToCart, cartItems, updateCartItem } = useCart();

  // Array of hookah objects
  const hookahs = [
    { name: 'DSH', description: 'This is where the hookah description will go.' },
    { name: 'Matt Pear', description: 'This is where the hookah description will go.' },
  ];

  // Check if hookah is already selected
  const isHookahSelected = (hookahName) => {
    return currentHookah.hookah === hookahName;
  };

  const handleAddBtn = (hookahName) => {
    // TODO: implement add button functionality here
    const updatedHookah = {
      ...currentHookah,
      hookah: hookahName,
      type: 'PendingHookah', // Mark as pending hookah
    };

    // Update currentHookah
    setCurrentHookah(updatedHookah);
    // Add pending hookah to localStorage
    localStorage.setItem('pendingHookah', JSON.stringify(updatedHookah));

    // Add or update the pending hookah in the cart
    if (!cartItems.some((item) => item.type === 'PendingHookah')) {
      addToCart(updatedHookah);
    } else {
      updateCartItem(updatedHookah, 'PendingHookah'); // Update the existing pending hookah in the cart
    }
  };

  useEffect(() => {
    // Redirect if no flavors are selected
    if (currentHookah.flavors.length === 0) {
      navigate('/menu/flavor');
    }
  }, [currentHookah, navigate]);

  const handlePrevBtn = () => {
    navigate('/menu/flavor');
  };

  const handleNextBtn = () => {
    navigate('/menu/flavor/hookah/base');
  };

  return (
    <>
      <h1>Hookahs</h1>
      <p>Select a hookah.</p>
      <div className="d-flex flex-column align-items-center">
        {hookahs.map((hookah) => (
          <div className="card mb-3" style={{ maxWidth: '540px' }} key={hookah.name}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={logo} className="img-fluid rounded-start" alt={hookah.name} />
              </div>
              <div className="col-md-8 d-flex flex-column">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-start align-items-left">
                    {hookah.name}
                  </h5>
                  <p className="card-text d-flex justify-content-start text-start">
                    {hookah.description}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end mx-2 mb-2">
                  <button
                    className="btn-add btn btn-primary w-25"
                    onClick={() => handleAddBtn(hookah.name)}
                    disabled={isHookahSelected(hookah.name)}>
                    {isHookahSelected(hookah.name) ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Buttons */}
      <div className="mt-3">
        <button className="btn-nav btn btn-primary me-2 w-25" onClick={handlePrevBtn}>
          Previous
        </button>
        <button
          className="btn-nav btn btn-primary ms-2 w-25"
          disabled={currentHookah.hookah.length === 0}
          onClick={handleNextBtn}>
          Next
        </button>
      </div>
    </>
  );
}
