import { useNavigate } from 'react-router-dom';

import { useCart } from '../UI/CartContext.jsx';
import logo from '../../assets/logo.png';

export default function Drinks() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Array of drinks objects
  const drinks = [
    { name: 'Diet Coke', description: 'This is where the drink description will go.' },
    { name: 'Coke', description: 'This is where the drink description will go.' },
  ];

  const handleAddBtn = (drinkName) => {
    const item = {
      name: drinkName,
      type: 'Drink',
      quantity: 1, // Adding as a single item
    };
    addToCart(item);
    // TODO: open cart after an item has been added
  };

  const handlePrevBtn = () => {
    navigate('/Menu');
  };

  return (
    <>
      <h1>Drinks Menu</h1>
      <p>Drinks are free I guess.</p>
      <div className="d-flex flex-column align-items-center">
        {drinks.map((drink) => (
          <div className="card mb-3" style={{ maxWidth: '540px' }} key={drink.name}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={logo} className="img-fluid rounded-start" alt={drink.name} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-start align-items-left">
                    {drink.name}
                  </h5>
                  <p className="card-text d-flex justify-content-start">{drink.description}</p>
                </div>
                <div className="d-flex flex-column align-items-end mx-2 mb-2">
                  <button
                    className="btn-add btn btn-primary mx-2 mt-2"
                    onClick={() => handleAddBtn(drink.name)}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="btn-nav btn btn-primary" onClick={handlePrevBtn}>
          Previous
        </button>
      </div>
    </>
  );
}
