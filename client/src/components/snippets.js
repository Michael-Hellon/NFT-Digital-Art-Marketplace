// return (
//   <div className="container my-1">
//     <Link to="/signup">← Go to Signup</Link>

//     <h2>Login to</h2>
//     <form onSubmit={handleFormSubmit}>

//       <div className="flex-row space-between my-2">
//         <label htmlFor="email">Email address:</label>
//         <input
//           placeholder="youremail@test.com"
//           name="email"
//           type="email"
//           id="email"
//           onChange={handleChange}
//         />
//       </div>
//       <div className="flex-row space-between my-2">
//         <label htmlFor="pwd">Password:</label>
//         <input
//           placeholder="******"
//           name="password"
//           type="password"
//           id="pwd"
//           onChange={handleChange}
//         />
//       </div>
//       {error ? (
//         <div>
//           <p className="error-text">The provided credentials are incorrect</p>
//         </div>
//       ) : null}
//       <div className="flex-row flex-end">
//         <button type="submit">Submit</button>
//       </div>
//     </form>
//   </div>
// );
// }



// // return (
// //     <>
// //       <button
// //         className="bg-blue-200 text-black active:bg-blue-500 
// //       font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
// //         type="button"
// //         onClick={() => setShowModal(true)}
// //       >
// //         Signup

// //       </button>
// //       <form onSubmit={handleFormSubmit}></form>
// //       {showModal ? (
// //         <>
// //           <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
// //             <div className="relative w-auto my-6 mx-auto max-w-3xl">
// //               <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// //                 <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
// //                   <h3 className="text-3xl font=semibold">SIGN UP</h3>
// //                   <button
// //                     className="bg-transparent border-0 text-black float-right"
// //                     onClick={() => setShowModal(false)}
// //                   >
// //                     <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
// //                       x
// //                     </span>
// //                   </button>
// //                 </div>
// //                 <div className="relative p-6 flex-auto">
// //                   <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">

// //                     <label htmlFor="firstName" className="block text-black text-sm font-bold mb-1">
// //                       First Name
// //                     </label>
// //                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
// //                       placeholder="First"
// //                       name="firstName"
// //                       type="firstName"
// //                       id="firstName"
// //                       onChange={handleChange}
// //                     />
                    
// //                     <label htmlFor="lastName" className="block text-black text-sm font-bold mb-1">
// //                       Last Name
// //                     </label>
// //                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
// //                       placeholder="Last"
// //                       name="lastName"
// //                       type="lastName"
// //                       id="lastName"
// //                       onChange={handleChange}
// //                     />
                    
// //                     <label htmlFor="email" className="block text-black text-sm font-bold mb-1">
// //                       Email:
// //                     </label>
// //                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
// //                       placeholder="youremail@test.com"
// //                       name="email"
// //                       type="email"
// //                       id="email"
// //                       onChange={handleChange}
// //                     />
                    
// //                     <label htmlFor="pwd"className="block text-black text-sm font-bold mb-1">
// //                       Password
// //                     </label>
// //                     <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
// //                       placeholder="******"
// //                       name="password"
// //                       type="password"
// //                       id="pwd"
// //                       onChange={handleChange}
// //                     />
                  
// //                   </form>
// //                 </div>
// //                 <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
// //                   <button
// //                     className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
// //                     type="button"
// //                     onClick={() => setShowModal(false)}
// //                   >
// //                   <Link to="/login">← Go to Login</Link>
// //                   </button>
// //                   <button
// //                     className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
// //                     type="button"
// //                     onClick={() => setShowModal(false)}
// //                   >
// //                     Submit
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </>
// //       ) : null}
// //     </>
// //   );

// //   return (
// //     <div className="container my-1">
// //       <Link to="/login">← Go to Login</Link>

// //       <h2>Signup</h2>
      
// //       <form onSubmit={handleFormSubmit}>
        
// //         <div className="flex-row space-between my-2">
// //           <label htmlFor="firstName">First Name:</label>
// //           <input
// //             placeholder="First"
// //             name="firstName"
// //             type="firstName"
// //             id="firstName"
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex-row space-between my-2">
// //           <label htmlFor="lastName">Last Name:</label>
// //           <input
// //             placeholder="Last"
// //             name="lastName"
// //             type="lastName"
// //             id="lastName"
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex-row space-between my-2">
// //           <label htmlFor="email">Email:</label>
// //           <input
// //             placeholder="youremail@test.com"
// //             name="email"
// //             type="email"
// //             id="email"
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex-row space-between my-2">
// //           <label htmlFor="pwd">Password:</label>
// //           <input
// //             placeholder="******"
// //             name="password"
// //             type="password"
// //             id="pwd"
// //             onChange={handleChange}
// //           />
// //         </div>
// //         <div className="flex-row flex-end">
// //           <button type="submit">Submit</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // export default Signup;


// // import React from "react";
// // import {
// //   Button,
// //   Dialog,
// //   DialogHeader,
// //   DialogBody,
// //   DialogFooter,
// // } from "@material-tailwind/react";
 
// // export function DialogDefault() {
// //   const [open, setOpen] = React.useState(false);
 
// //   const handleOpen = () => setOpen(!open);
 
// //   return (
// //     <>
// //       <Button onClick={handleOpen} variant="gradient">
// //         Open Modal
// //       </Button>
// //       <Dialog open={open} handler={handleOpen}>
// //         <DialogHeader>Its a simple modal.</DialogHeader>
// //         <DialogBody>
// //           The key to more success is to have a lot of pillows. Put it this way,
// //           it took me twenty five years to get these plants, twenty five years of
// //           blood sweat and tears, and I&apos;m never giving up, I&apos;m just
// //           getting started. I&apos;m up to something. Fan luv.
// //         </DialogBody>
// //         <DialogFooter>
// //           <Button
// //             variant="text"
// //             color="red"
// //             onClick={handleOpen}
// //             className="mr-1"
// //           >
// //             <span>Cancel</span>
// //           </Button>
// //           <Button variant="gradient" color="green" onClick={handleOpen}>
// //             <span>Confirm</span>
// //           </Button>
// //         </DialogFooter>
// //       </Dialog>
// //     </>
// //   );
// // }


// <div className="App flex flex-col items-center justify-center" onClick={SignUpModal}>
// <SignUpModal />
// </div>