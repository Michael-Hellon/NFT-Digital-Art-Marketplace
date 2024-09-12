import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div className="text-white" >
      <h2>Choose a Category:</h2>
      <>
        {categories.map((item) => (
        <>
        <div className="inline-block rounded shadow hover:bg-black text-white shadow-lg outline-none focus:outline-none mr-1 mb-1">
          <div className="mr-4">
            <button
              key={item._id}
              onClick={() => {
                handleClick(item._id);
              }}
            >
              {item.name}
            </button>
            </div>
          </div>
        </>
      ))}
        <div className="inline-block rounded shadow hover:bg-black text-white shadow-lg outline-none focus:outline-none mr-1 mb-1">
          <button onClick={() => { handleClick('') }}>
            All
          </button>
        </div>
      </>      
    </div>
  );
}

export default CategoryMenu;
