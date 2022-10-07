import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { instance } from '../services/QuestionsService';

function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();
   
   function handleChangeEmail(e) {
      setEmail(e.target.value);
   }

   function handleChangePassword(e) {
      setPassword(e.target.value);
   }

   function handleSubmit(e) {
      e.preventDefault();
      instance.post(`/api_keys`, {}, {
         auth: {
            username: email,
            password: password
         }
      })
      .then((res) => {
         localStorage.setItem('jetsky_token', JSON.stringify(res.data.api_key));
         localStorage.setItem('warrior', JSON.stringify(res.data.warrior));
         navigate(`/`);
      });
   }

   return (
      <> 
         <div className='card-password'>
            <form className="form-container">
               <div className='font-medium mb-6'>Login to our platform</div>
               <div className="block">
                  <div class="">
                     <label>Your email</label>
                     <input onChange={handleChangeEmail} id="questions-title" type="text" placeholder="name@mail.com" className="input-field" autoFocus />
                  </div>
                  
                  <div class="">
                     <label>Your password</label>
                     <input onChange={handleChangePassword} id="user-password" type="password" placeholder="••••••••" className="input-field" autoFocus />
                  </div>
               </div>

               <div class="flex items-start">
                  <div class="flex items-start">
                     <div class="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required="" />
                     </div>
                     <div class="text-sm ml-3">
                        <label for="remember" class="font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                     </div>
                  </div>
                  <a href="#" class="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500">Lost Password?</a>
               </div>
            
               <button onClick={handleSubmit} class="form-button-login">
                  Login
               </button>
            </form>
         </div>
      </>
   )
}

export { Login }