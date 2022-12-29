import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { instance } from '../services/axios';
import { useRecoilState } from 'recoil';
import { loadingState } from '../store/recoil';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showInvalidMessage, setShowInvalidMessage] = useState(false);
   const [loading, setLoading] = useRecoilState(loadingState);

   const navigate = useNavigate();
   const { goback } = useParams();
   
   function handleChangeEmail(e) {
      setEmail(e.target.value);
      if (showInvalidMessage) {
         setShowInvalidMessage(false);
      }
   }

   function handleChangePassword(e) {
      setPassword(e.target.value);
      if (showInvalidMessage) {
         setShowInvalidMessage(false);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (showInvalidMessage) {
         setShowInvalidMessage(false);
      }
      instance.post(`/api_keys`, {}, {
         auth: {
            username: email,
            password: password
         }
      })
      .then((res) => {
         localStorage.setItem('jetsky_token', JSON.stringify(res.data.api_key));
         localStorage.setItem('warrior', JSON.stringify(res.data.warrior));
         
         if(goback) {
            navigate(-1)
         } else {
            navigate(`/`);
         }
      })
      .catch((err) => {
         setShowInvalidMessage(true)
      });
      ;
   }

   return (
      <> 
         <div className='card-password'>
            <form className="form-container">

               Loading: {loading.toString()}
               
               <div className='font-medium mb-6'>Login to our platform</div>
               <div className="block">
                  <div className="">
                     <label>Your email</label>
                     <input onChange={handleChangeEmail} id="questions-title" type="text" placeholder="name@mail.com" className={`input-field ${showInvalidMessage ? 'border-red-600': ''}`} autoFocus />
                  </div>
                  
                  <div className="">
                     <label>Your password</label>
                     <input onChange={handleChangePassword} id="user-password" type="password" placeholder="••••••••" className={`input-field  ${showInvalidMessage ? 'border-red-600': ''}`} />
                  </div>
               </div>

               <div className="flex items-start">
                  <div className="flex items-start">
                     <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                     </div>
                     <div className="text-sm ml-1">
                        <label for="remember" className="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                     </div>
                  </div>
                  <a href="#" className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">Lost Password?</a>
               </div>
            
               <button onClick={handleSubmit} className="form-button-login">
                  Login
               </button>
               { showInvalidMessage && 
                  <div className="invalid-input-message text-sm text-center text-red-600">
                     E-mail or password do not match.
                  </div>
               }
               {
                  !showInvalidMessage &&
                  <div className='text-sm'><span>&nbsp;&nbsp;</span></div>
               }
               <div className='text-center mt-3'>
                  <Link to='/sign-up' className='link'>I don't have an account yet</Link>
               </div>
            </form>
         </div>
      </>
   )
}

export { Login }