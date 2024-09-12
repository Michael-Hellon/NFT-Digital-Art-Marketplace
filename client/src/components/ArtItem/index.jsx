import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
// import './style.css';

function ArtItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    quantity,
    artist,
    price,
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity)
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity)
        });
    } else {
      dispatch({
        type: ADD_TO_CART,
        piece: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="mb-4">


    <div className=" x-12 py-1">
      <Link to={`/pieces/${_id}`}>
        <img className="size-120 ml-6 mt-6"
          alt={name}
          src={`/images/${image}`}
        />
              </Link>
      <div className="ml-16 mt-6">
        {/* <div>{quantity} {pluralize("item", quantity)} in stock</div> */}
        <p>Title: {name}</p>
        <p>Artist: {artist}</p>

        <span>Price: ${price}</span>
      </div>
        <div className="ml-12 justify-center pb-16">
        <button className="px-4 py-2 m-2 rounded shadow hover:bg-black text-white shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={addToCart}>Add to cart</button>
        </div>
      

    </div>
    </div>

  )
}

export default ArtItem;

{/* <div className="inline-block text-white bg-blue-400 text-center px-4 py-2 m-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"> */}
