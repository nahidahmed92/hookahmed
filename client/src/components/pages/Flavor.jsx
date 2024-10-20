import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import QuantitySelector from '../UI/QuantitySelector.jsx';

export default function Flavor() {
  const navigate = useNavigate();

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
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={logo} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8 d-flex flex-column">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-start align-items-left">
                  Peppermint Shake
                </h5>
                <p className="card-text d-flex justify-content-start">
                  This is where the flavor profile will go.
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
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={logo} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8 d-flex flex-column">
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-start align-items-left">Mint</h5>
                <p className="card-text d-flex justify-content-start">
                  This is where the flavor profile will go.
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
      </div>
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

// <div>
// <h1>Flavor Menu</h1>
// <p>Select a mix, or make your own.</p>
// <img alt="flavor" src={logo} style={{ height: '100px' }} />
// <img alt="flavor" src={logo} style={{ height: '100px' }} />
// <img alt="flavor" src={logo} style={{ height: '100px' }} />
// <img alt="flavor" src={logo} style={{ height: '100px' }} />
// <img alt="flavor" src={logo} style={{ height: '100px' }} />
// <img alt="flavor" src={logo} style={{ height: '100px' }} />
// </div>
// <div>
// <button onClick={handlePrevBtn}>Previous</button>
// <button onClick={handleNextBtn}>Next</button>
// </div>
