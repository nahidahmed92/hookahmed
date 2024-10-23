import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default function Customizations() {
  const navigate = useNavigate();

  // Array of customization objects
  const customizations = [
    { name: 'Ice Base', description: 'This is where the customization description will go.' },
    { name: 'Fruit Base', description: 'This is where the customization description will go.' },
  ];

  const handleAddBtn = () => {
    // TODO: implement add button functionality here
    // here it should add the item to the cart and take you back to Menu. If the customer does not want to order anything else they can use the checkout button which now should be selectable
  };

  const handlePrevBtn = () => {
    navigate('/menu/flavor/hookah/base');
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
                  <button className="btn btn-primary" onClick={handleAddBtn}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={handlePrevBtn}>
          Previous
        </button>
        <button className="btn btn-primary mx-2" onClick={handleAddBtn}>
          Add to Cart
        </button>
      </div>
    </>
  );
}
