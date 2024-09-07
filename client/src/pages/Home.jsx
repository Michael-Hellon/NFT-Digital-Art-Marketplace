import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <h1 style={{backgroundColor: "Chartreuse", margin: "1% 5% 1% 5%", padding: "1% 5% 1% 5%"}}>
      <CategoryMenu />
      <ProductList />
      <Cart />
      </h1>
    </div>
  );
};

export default Home;
