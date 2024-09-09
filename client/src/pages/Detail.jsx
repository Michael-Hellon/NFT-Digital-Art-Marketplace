import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PIECES,
} from '../utils/actions';
import { QUERY_PIECES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentPiece, setCurrentPiece] = useState({});

  const { loading, data } = useQuery(QUERY_PIECES);

  const { pieces, cart } = state;

  useEffect(() => {
    // already in global store
    if (pieces.length) {
      const piece = pieces.find((piece) => piece._id === id);

      const item = {
        image: piece.image,
        name: piece.name,
        _id: piece._id,
        description: piece.description,
        price: piece.price,
        quantity: piece.quantity,
      };
      
      setCurrentPiece(item);
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PIECES,
        pieces: data.pieces,
      });

      data.pieces.forEach((piece) => {
        idbPromise('pieces', 'put', piece);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('pieces', 'get').then((indexedPieces) => {
        dispatch({
          type: UPDATE_PIECES,
          pieces: indexedPieces,
        });
      });
    }
  }, [pieces, data, loading, dispatch, id]);

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
        piece: { ...currentPiece, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentPiece, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentPiece._id,
    });

    idbPromise('cart', 'delete', { ...currentPiece });
  };


// need to re-arrange layout of this page  
  return (
    <>
      {currentPiece && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Art Pieces</Link>

          {/* <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('/img/card-left.jpg')" title="Woman holding a mug">
            </div>
              <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                  <p className="text-sm text-gray-600 flex items-center">
                    <img src={`/images/${currentPiece.image}`} alt={currentPiece.name}/>


                    {/* <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg> */} */}



          <h2>{currentPiece.name}</h2>

          {/* <p>{currentPiece.description}</p> */}

          <p>
            <strong>Price:</strong>${currentPiece.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentPiece._id)}
              onClick={removeFromCart}
              
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentPiece.image}`}
            alt={currentPiece.name}
          />
          <div className="description">
          <strong>Description:</strong>{currentPiece.description}{' '}

          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
