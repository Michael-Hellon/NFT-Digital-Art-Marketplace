import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';


function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);
  const [signupModal, setSignupModal] = useState(false);

  const handleFormSubmit = async (event) => {

    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    // console.log("Mutation Response", mutationResponse);
    const token = mutationResponse.data.addUser.token;
    // console.log("token A from Signup in:", token);

    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <button
        className="bg-blue-400 text-white active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setSignupModal(true)}
      >
        ☁️ Sign Up ☁️
      </button>
      <form >
      {signupModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 b rounded-t ">
                  <h3 className="text-3xl font=semibold"> 🛩 SIGN UP 🛩</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setSignupModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <div className="bg-gray-400 shadow-md rounded px-8 pt-6 pb-8 w-full">

                    <label htmlFor="firstName" className="block text-black text-sm font-bold mb-1">
                      First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="First"
                      name="firstName"
                      type="firstName"
                      id="firstName"
                      onChange={handleChange}
                    />
                    
                    <label htmlFor="lastName" className="block text-black text-sm font-bold mb-1">
                      Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="Last"
                      name="lastName"
                      type="lastName"
                      id="lastName"
                      onChange={handleChange}
                    />
                    
                    <label htmlFor="email" className="block text-black text-sm font-bold mb-1">
                      Email:
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="youremail@test.com"
                      name="email"
                      type="email"
                      id="email"
                      onChange={handleChange}
                    />
                    
                    <label htmlFor="password"className="block text-black text-sm font-bold mb-1">
                      Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                      placeholder="******"
                      name="password"
                      type="password"
                      id="pwd"
                      onChange={handleChange}
                    />
                  
                  </div>
                </div>
                <div className="flex items-center justify-end p-6  rounded-b">
                  {/* <button
                    className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setSignupModal(false)}
                  >
                  Login
                  </button> */}
                  <button
                    className="text-white bg-blue-400 active:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-500 outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    
                    onClick={() => {handleFormSubmit()
                      setSignupModal(false)}}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        
      ) : null}
      </form>
    </>
  );
}

export default Signup;
