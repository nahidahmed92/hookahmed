// Header
import Cart from './UI/Cart.jsx';
import logo from '../assets/logo.png';
export default function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ borderRadius: '8px' }}>
        <div className="container-fluid">
          <div className="d-flex">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" width="50px" />
            </a>
            <div className="navbar" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/menu">
                    Menu
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="navbar" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <a className="nav-link text-black mx-2" href="#">
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
