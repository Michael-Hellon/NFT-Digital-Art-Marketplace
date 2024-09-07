import ArtList from "../components/ArtList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <h1 style={{backgroundColor: "Chartreuse", margin: "1% 5% 1% 5%", padding: "1% 5% 1% 5%"}}>
      <CategoryMenu />
      <ArtList />
      <Cart />
      </h1>
    </div>
  );
};

export default Home;
