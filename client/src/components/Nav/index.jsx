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
        <div className="container mx-auto">
        {/* <h1 style={{backgroundColor: "Red", margin: "1% 5% 1% 5%", padding: "1% 5% 1% 5%"}}> */}
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
        {/* </h1> */}
        </div>
      );
    }
  }

  return (
    <h1 style={{backgroundColor: "purple", margin: "2% 10% 2% 10%", padding: "2% 10% 2% 10%"}}>
    <header className="flex-row px-1">
     
        <Link to="/">

          <span role="img" aria-label="shopping bag">🛍️</span>
          Open Air NFT Market Place
        </Link>


      <nav>
        {showNavigation()}
      </nav>
    </header>
  </h1>
  );

}

export default Nav;
