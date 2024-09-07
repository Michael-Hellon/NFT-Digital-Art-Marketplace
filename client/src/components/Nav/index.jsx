import React from 'react';
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (

        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/orderHistory">
              Order History
            </Link>
          </li>
          <li className="mx-1">
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>

      );
    } else {
      return (
 
        // <h1 style={{backgroundColor: "Red", margin: "1% 5% 1% 5%", padding: "1% 5% 1% 5%"}}>
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>


      );
    }
  }

  return (
    // <div className="">

    <div>
      <nav className="mx-auto bg-blue-500 text-white p-4" >
    <header className="flex-row px-1">
     
        <Link to="/">

          <span role="img" aria-label="shopping bag">🛍️</span>
          Open Air NFT Market Place
        </Link>


      <nav>
        {showNavigation()}
      </nav>
    </header>
    </nav>
  </div>
  );

}

export default Nav;
