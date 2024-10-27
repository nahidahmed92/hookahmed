import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();

  const handleHookahBtn = () => {
    navigate('/menu/flavor');
  };

  const handleDrinksBtn = () => {
    navigate('/menu/drinks');
  };

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1>Menu</h1>
        <button className="btn-menu btn btn-primary mt-5 w-25" onClick={handleHookahBtn}>
          Hookahs
        </button>
        <button className="btn-menu btn btn-primary mt-5 w-25" onClick={handleDrinksBtn}>
          Drinks
        </button>
      </div>
    </>
  );
}
