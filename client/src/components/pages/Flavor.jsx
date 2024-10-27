import { useNavigate } from 'react-router-dom';

import { useCart } from '../UI/CartContext.jsx';
import logo from '../../assets/logo.png';

export default function Flavor({ currentHookah, setCurrentHookah }) {
  const navigate = useNavigate();
  const { addToCart, cartItems, updateCartItem } = useCart();

  // Array of flavor objects
  const flavors = [
    { name: 'Peppermint Shake', description: 'This is where the flavor profile will go.' },
    { name: 'Mint', description: 'This is where the flavor profile will go.' },
  ];

  const isFlavorInCart = (flavorName) => {
    return currentHookah.flavors.includes(flavorName);
  };

  const handleAddBtn = (flavorName) => {
    let updatedFlavors;
    if (isFlavorInCart(flavorName)) {
      // Remove flavor if it's already selected
      updatedFlavors = currentHookah.flavors.filter((flavor) => flavor !== flavorName);
    } else {
      // Add flavor if it's not selected
      updatedFlavors = [...currentHookah.flavors, flavorName];
    }

    const updatedHookah = {
      ...currentHookah,
      flavors: updatedFlavors,
      type: 'PendingHookah',
    };

    // Update currentHookah
    setCurrentHookah(updatedHookah);
    // Add pending hookah to localStorage
    localStorage.setItem('pendingHookah', JSON.stringify(updatedHookah));

    // Add or update in the cart
    if (!cartItems.some((item) => item.type === 'PendingHookah')) {
      addToCart(updatedHookah);
    } else {
      // Updates the existing pending hookah in the cart
      updateCartItem(updatedHookah, 'PendingHookah');
    }
  };

  const handlePrevBtn = () => {
    navigate('/menu');
  };

  const handleNextBtn = () => {
    navigate('/menu/flavor/hookah');
  };

  return (
    <>
      <h1>Flavor Menu</h1>
      <p>Select flavor(s).</p>
      <div className="d-flex flex-column align-items-center">
        {flavors.map((flavor) => (
          <div className="card mb-3" style={{ maxWidth: '540px' }} key={flavor.name}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={logo} className="img-fluid rounded-start" alt={flavor.name} />
              </div>
              <div className="col-md-8 d-flex flex-column">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-start align-items-left">
                    {flavor.name}
                  </h5>
                  <p className="card-text d-flex justify-content-start text-start">
                    {flavor.description}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end mx-2 mb-2">
                  <button
                    className="btn-add btn btn-primary w-25"
                    onClick={() => handleAddBtn(flavor.name)}>
                    {isFlavorInCart(flavor.name) ? 'Remove' : 'Add'}
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
          disabled={currentHookah.flavors.length === 0}
          onClick={handleNextBtn}>
          Next
        </button>
      </div>
    </>
  );
}
