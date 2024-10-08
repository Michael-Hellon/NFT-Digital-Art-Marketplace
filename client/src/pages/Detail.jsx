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
        artist:piece.artist,
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
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity),
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity),
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
        <div className="container m-auto my-3 ">
          <div className="text-white text-base">
            <Link to="/">← Back to Art Pieces</Link>
          </div>
          <div className="mt-5 pb-80 justify-center max-w-sm w-full lg:max-w-full lg:flex mb-4">
            {/* image */}
            <div className="h-auto lg:h-auto lg:w-auto flex-none bg-cover rounded-t-none lg:rounded-l-2xl text-center overflow-hidden">
              <img src={`/images/${currentPiece.image}`} alt={currentPiece.name}/>
            </div>
            {/* text box */}
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-gray-200 rounded-b lg:rounded-r-2xl p-8 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                {/* <p className="text-sm text-gray-600 flex items-center">
                  <img src={`/images/${currentPiece.image}`} alt={currentPiece.name}/>
                  </p> */}
                  <div className="currentPieceName text-gray-900 font-bold text-3xl mb-10">Title: {currentPiece.name}</div>
                  <div className="piecePrice text-gray-900 font-bold text-xl mb-5">Price: ${currentPiece.price}{' '}</div>
                  <p className="text-2xl font-bold mb-3" >About the piece</p>
                  <p className="description text-gray-700 text-2xl">{currentPiece.description}{' '}</p>
                  <p className="text-gray-700 text-2xl mt-5">Artist: {currentPiece.artist}{' '}</p>
              </div>
              <div className="flex items-center">
                <div className="text-sm">
                </div>
              </div> 
              <button className="text-center px-4 py-2 m-2 rounded shadow hover:bg-white shadow-lg outline-none focus:outline-none mr-1 mb-1" onClick={addToCart}>Add to cart</button>
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