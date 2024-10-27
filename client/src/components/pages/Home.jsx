// Landing page
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.png';
import '../../App.css';

export default function Home() {
  const navigate = useNavigate();

  const handleButtonOrder = () => {
    navigate('/Menu');
  };
  return (
    <>
      <h1></h1>
      <img className="logo mt-5" src={logo} />
      <div className="m-3">
        <button className="btn-menu btn btn-primary w-25" onClick={handleButtonOrder}>
          Order Now
        </button>
      </div>
    </>
  );
}
