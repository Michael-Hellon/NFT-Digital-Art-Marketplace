import ArtList from "../components/ArtList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ArtList />
      <Cart />
    </div>
  );
};

export default Home;
