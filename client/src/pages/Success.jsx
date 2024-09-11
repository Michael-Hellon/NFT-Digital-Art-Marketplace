import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { Link } from 'react-router-dom';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const pieces = cart.map((item) => item._id);

      if (pieces.length) {
        const { data } = await addOrder({ variables: { pieces } });
        const pieceData = data.addOrder.pieces;

        pieceData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <div className="px-4 py-1 mb-8" >
          <h1>Congratulation!</h1>
          <h2>Thank you for your purchase!</h2>
        </div>
        {/* <h2>You will now be redirected to the home page</h2> */}
        <div className='inline-block text-white bg-blue-300 text-center px-4 py-2 m-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1'>
          <Link to="/">Continue Shopping</Link>
        </div>    
      </Jumbotron>

    </div>
  );
}

export default Success;
