import { useEffect } from 'react';
import ArtItem from '../ArtItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PIECES } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PIECES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ArtList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PIECES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PIECES,
        pieces: data.pieces,
      });
      data.pieces.forEach((piece) => {
        idbPromise('pieces', 'put', piece);
      });
    } else if (!loading) {
      idbPromise('pieces', 'get').then((pieces) => {
        dispatch({
          type: UPDATE_PIECES,
          pieces: pieces,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterPieces() {
    if (!currentCategory) {
      return state.pieces;
    }

    return state.pieces.filter(
      (piece) => piece.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Art Pieces:</h2>
      {state.pieces.length ? (
        <div className="flex-row">
          {/* outside the card */}
          {filterPieces().map((piece) => (
            <ArtItem
            
              key={piece._id}
              _id={piece._id}
              image={piece.image}
              name={piece.name}
              price={piece.price}
              quantity={piece.quantity}
              artist={piece.artist}
            />            

          ))}
          {/* outside the card */}
        </div>
      ) : (
        <h3>You haven't added any art pieces yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ArtList;
