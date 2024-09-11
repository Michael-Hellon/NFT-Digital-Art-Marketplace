import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Singup from "../../pages/Signup";
import Login from "../../pages/Login";

// import './style.css';

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row text-center">
          <div className="inline-block text-white bg-blue-400 text-center px-4 py-2 m-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">{
          <li className="mx-1">

            <Link to="/orderHistory"> 
            ☁️ Order History ☁️
            </Link>

          </li>}
          </div>  
          <div className="inline-block text-white bg-blue-400 text-center px-4 py-2 m-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">{          
          <li className="mx-1">


            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
            ☁️ Logout ☁️
            </a>
          </li>}
          </div>

        </ul>
      );
    } else {
      return (
        <>
        <div className="flex-row text-center bg-red">
        <div className="inline-block bg-green text-center px-4 py-2 m-2">{
          <Singup>
       
          </Singup>}
        </div>
        <div className="inline-block bg-blue-400 text-center px-4 py-2 m-2">{
          <Login>

          </Login>}
        </div>
        </div>

      </>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <h1>
        <Link to="/">
        <div className="text-center">
        <div className="inline-block font-medium text-white text-center text-4xl bg-blue-400 px-4 py-4 m-2">
            <span role="img" aria-label="shopping bag">
            ☁️ 🛩 OpenAir NFT Market Place 🛩 ☁️
            </span>
          </div>
          </div>
        </Link>
      </h1>

      <nav>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
