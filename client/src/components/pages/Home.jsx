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
      <h1>HookahMED</h1>
      <img className="logo" src={logo} />
      <div className="m-3">
        <button className="btn btn-primary" onClick={handleButtonOrder}>
          Order Now
        </button>
      </div>
    </>
  );
}
