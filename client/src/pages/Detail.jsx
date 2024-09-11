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
        <div className="container m-auto my-3">
          <div className="text-base">
            <Link to="/">← Back to Art Pieces</Link>
          </div>
          <div className="mt-5 max-w-sm w-full lg:max-w-full lg:flex ">
            {/* image */}
            <div className="h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t-none lg:rounded-l-2xl text-center overflow-hidden">
              <img src={`/images/${currentPiece.image}`} alt={currentPiece.name}/>
            </div>
            {/* text box */}
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-r-2xl p-8 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                {/* <p className="text-sm text-gray-600 flex items-center">
                  <img src={`/images/${currentPiece.image}`} alt={currentPiece.name}/>
                  </p> */}
                  <div className="currentPieceName text-gray-900 font-bold text-3xl mb-10">{currentPiece.name}</div>
                  <div className="piecePrice text-gray-900 font-bold text-2xl mb-5">${currentPiece.price}{' '}</div>
                  <p className="description text-gray-700 text-xl">{currentPiece.description}{' '}</p>
                  <p className="text-gray-900 leading-none">{currentPiece.artist}{' '}</p>


              </div>
              <div className="flex items-center">
                  <div className="text-sm">

                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;