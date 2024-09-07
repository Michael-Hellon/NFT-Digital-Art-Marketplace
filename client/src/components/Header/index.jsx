import React from 'react';
import { Link } from 'react-router-dom';
import { toggleCart } from '../Cart/index';
import Auth from "../../utils/auth"; 

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="flex-row px-1 container mx-auto" style={{ backgroundColor: "lightblue", margin: "2% 10%", padding: "2% 10%" }}>
      <Link to="/">
        <span role="img" aria-label="shopping bag">🛍️</span>
        Open Air NFT Market Place
      </Link>
      <nav>
        {Auth.loggedIn() ? (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/orderHistory">Order History</Link>
            </li>
            <li className="mx-1">
              <a href="/" onClick={logout}>Logout</a>
            </li>
          </ul>
        ) : (
          <ul className="flex-row">
            <li className="mx-1">
              <Link to="/signup">Signup</Link>
            </li>
            <li className="mx-1">
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </nav>
      if (!state.cartOpen) {
      <div className="cart-closed" onClick={toggleCart}>
        <span role="img" aria-label="trash">
          🛒
        </span>
      </div>
      }
  
    </header>
  );
};

export default Header;
