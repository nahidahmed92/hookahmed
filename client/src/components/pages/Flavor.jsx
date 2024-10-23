import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default function Flavor({ currentHookah, setCurrentHookah }) {
  const navigate = useNavigate();

  // Array of flavor objects
  const flavors = [
    { name: 'Peppermint Shake', description: 'This is where the flavor profile will go.' },
    { name: 'Mint', description: 'This is where the flavor profile will go.' },
  ];

  const isFlavorInCart = (flavorName) => {
    return currentHookah.flavors.includes(flavorName);
  };

  const handleAddBtn = () => {
    // TODO: implement add button functionality here
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
                  <p className="card-text d-flex justify-content-start">{flavor.description}</p>
                </div>
                <div className="d-flex flex-column align-items-end mx-2 mb-2">
                  <button className="btn btn-primary w-25" onClick={handleAddBtn}>
                    {isFlavorInCart(flavor.name) ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Buttons */}
      <div className="mt-3">
        <button className="btn btn-primary mx-2" onClick={handlePrevBtn}>
          Previous
        </button>
        <button className="btn btn-primary mx-2" onClick={handleNextBtn}>
          Next
        </button>
      </div>
    </>
  );
}
