import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_ARTPIECES,
} from '../utils/actions';
import { QUERY_ARTPIECES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentArt, setCurrentArt] = useState({});

  const { loading, data } = useQuery(QUERY_ARTPIECES);

  const { artPieces, cart } = state;

  useEffect(() => {
    // already in global store
    if (artPieces.length) {
      const art = artPieces.find((art) => art._id === id);

      const item = {
        image: art.image,
        name: art.name,
        _id: art._id,
        description: art.description,
        price: art.price,
        quantity: art.quantity,
      };
      
      setCurrentArt(item);
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_ARTPIECES,
        artPieces: data.artPieces,
      });

      data.artPieces.forEach((art) => {
        idbPromise('artPieces', 'put', art);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('artPieces', 'get').then((indexedArtPieces) => {
        dispatch({
          type: UPDATE_ARTPIECES,
          artPieces: indexedArtPieces,
        });
      });
    }
  }, [artPieces, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        art: { ...currentArt, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentArt, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentArt._id,
    });

    idbPromise('cart', 'delete', { ...currentArt });
  };


// need to re-arrange layout of this page  
  return (
    <>
      {currentArt && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Art Pieces</Link>

          <h2>{currentArt.name}</h2>

          {/* <p>{currentArt.description}</p> */}

          <p>
            <strong>Price:</strong>${currentArt.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentArt._id)}
              onClick={removeFromCart}
              
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentArt.image}`}
            alt={currentArt.name}
          />
          <div className="description">
          <strong>Description:</strong>{currentArt.description}{' '}

          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
