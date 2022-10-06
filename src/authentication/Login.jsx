import React from 'react'

function Login() {
   return (
      <> 
         <div className='card-password'>
            <form className="form-container">
               <div className='font-medium mb-6'>Login to our platform</div>
               <div className="block">
                  <div class="">
                     <label>Your email</label>
                     <input id="questions-title" type="text" placeholder="name@mail.com" className="input-field" autoFocus />
                  </div>
                  
                  <div class="">
                     <label>Your password</label>
                     <input id="user-password" type="password" placeholder="••••••••" className="input-field" autoFocus />
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
            
               <button class="form-button-login">
                  Login
               </button>
            </form>
         </div>
      </>
   )
}

export { Login }