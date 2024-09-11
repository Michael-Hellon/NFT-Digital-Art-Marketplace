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
    price,
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
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
    <div className="card px-1 py-1">
      <Link to={`/pieces/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>




    // <div className="flex mb-4">
    //   <div className="px-1 py-1 w-1/4 h-640">

    //   <Link to={`/pieces/${_id}`}>
    //     <img src={`/images/${image}`} alt={name}/>

    //       <div className="px-6 py-4">
    //         <div className="font-bold text-xl">{name}</div>
    //       </div>
    //   </Link>      
    //       <div className="px-6 pb-2">
    //         <div>{quantity} {pluralize("item", quantity)} in stock</div>
    //         <span>${price}</span>
    //       </div>
    //       <div className="px-6 pb-2">
    //       <button onClick={addToCart}>Add to cart</button>
    //       </div>
    //     </div>
    // </div>
   
  )
}

export default ArtItem;


    {/* <div className="card px-1 py-1">
      <Link to={`/pieces/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>

  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <div className="card px-1 py-1">
      <img src={`/images/${image}`} alt={name}>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{name}</div>
        </div>
        <div class="px-6 pt-4 pb-2">
          <div>{quantity} {pluralize("item", quantity)} in stock</div>
          <span>${price}</span>
        </div>
        <button onClick={addToCart}>Add to cart</button>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" onClick={addToCart}>Add to cart</span>
        </div>
    </div>
  </div>
*/}