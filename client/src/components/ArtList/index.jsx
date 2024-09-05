import { useEffect } from 'react';
import ArtItem from '../ArtItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_ARTPIECES } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_ARTPIECES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ArtList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_ARTPIECES);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_ARTPIECES,
        artPieces: data.artPieces,
      });
      data.artPieces.forEach((art) => {
        idbPromise('artPieces', 'put', art);
      });
    } else if (!loading) {
      idbPromise('artPieces', 'get').then((artPieces) => {
        dispatch({
          type: UPDATE_ARTPIECES,
          artPieces: artPieces,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterArtPieces() {
    if (!currentCategory) {
      return state.artPieces;
    }

    return state.artPieces.filter(
      (art) => art.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Art Pieces:</h2>
      {state.artPieces.length ? (
        <div className="flex-row">
          {filterArtPieces().map((art) => (
            <ArtItem
              key={art._id}
              _id={art._id}
              image={art.image}
              name={art.name}
              price={art.price}
              quantity={art.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any art pieces yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ArtList;
