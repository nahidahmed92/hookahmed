import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';

export default function Base() {
  const navigate = useNavigate();

  // Array of base objects
  const bases = [
    { name: 'Smoke', description: 'This is where the base description will go.' },
    { name: 'Clear', description: 'This is where the base description will go.' },
  ];

  const handleAddBtn = () => {
    // TODO: implement add button functionality here
  };

  const handlePrevBtn = () => {
    navigate('/menu/flavor/hookah');
  };

  const handleNextBtn = () => {
    navigate('/menu/flavor/hookah/base/customization');
  };

  return (
    <>
      <h1>Bases</h1>
      <p>Select a base of your choice.</p>
      <div className="d-flex flex-column align-items-center">
        {bases.map((base) => (
          <div className="card mb-3" style={{ maxWidth: '540px' }} key={base.name}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={logo} className="img-fluid rounded-start" alt={base.name} />
              </div>
              <div className="col-md-8 d-flex flex-column">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-start align-items-left">
                    {base.name}
                  </h5>
                  <p className="card-text d-flex justify-content-start">{base.description}</p>
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
        <button className="btn btn-primary mx-2" onClick={handleNextBtn}>
          Next
        </button>
      </div>
    </>
  );
}
