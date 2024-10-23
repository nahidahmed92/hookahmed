import { useNavigate } from 'react-router-dom';

import { useCart } from '../UI/CartContext.jsx';
import logo from '../../assets/logo.png';

export default function Drinks() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddBtn = (drinkName) => {
    // TODO: implement add button functionality here
    const item = {
      name: drinkName,
      type: 'Drink',
      quantity: 1, // Adding as a single item
    };
    addToCart(item);
  };

  const handlePrevBtn = () => {
    navigate('/Menu');
  };

  return (
    <>
      <h1>Drinks Menu</h1>
      <p>Drinks are free I guess.</p>
      <div className="d-flex flex-column align-items-center">
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={logo} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-start align-items-left">
                  Diet Coke
                </h5>
                <p className="card-text d-flex justify-content-start">
                  This is where the flavor profile will go.
                </p>
              </div>
              <div className="d-flex flex-column align-items-end mx-2">
                <button
                  className="btn btn-primary mx-2 mt-2"
                  onClick={() => handleAddBtn('Diet Coke')}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={logo} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-start align-items-left">Coke</h5>
                <p className="card-text d-flex justify-content-start">
                  This is where the flavor profile will go.
                </p>
              </div>
              <div className="d-flex flex-column align-items-end mx-2">
                <button className="btn btn-primary mx-2 mt-2" onClick={() => handleAddBtn('Coke')}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={handlePrevBtn}>
          Previous
        </button>
      </div>
    </>
  );
}
