import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../services/QuestionsService';

function NavBar() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [currentWarrior, setCurrentWarrior] = useState(0);
   const [jestkyToken, setJetskyToken] = useState('');

   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const warrior = JSON.parse(localStorage.getItem('warrior'));
      const token = JSON.parse(localStorage.getItem('jetsky_token'));
      if (warrior) {
         setIsLoggedIn(true);
         setCurrentWarrior(warrior)
         setJetskyToken(token)
      } else {
         logout();
      }
   },[location]);

   function logout() {
      setIsLoggedIn(false);
      setCurrentWarrior(0);
      localStorage.removeItem('warrior');
      localStorage.removeItem('jetsky_token');
   }

   function handleLogout() {
      instance.delete(`/api_keys/${jestkyToken.id}`, {
         headers: {
            authorization: `Bearer ${jestkyToken.token}`
         }
      })
      .finally(() => {
         logout();
         navigate(`/`);
      })
   }

   return (
      <nav class="nav">
         <div class="flex flex-wrap justify-between items-center mx-auto">
         <Link to="/" class="flex items-center">
            <img src="/logo-braver.png" class="h-6 sm:h-9 scale-75" alt="Braver Logo" />
            <span class="self-center text-sm font-semibold whitespace-nowrap dark:text-white">Ask</span>
         </Link>

         <div class="flex md:order-1">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" class="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
               <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
               <span class="sr-only">Search</span>
            </button>

            <div class="hidden relative md:block">
               <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
               <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
               <span class="sr-only">Search icon</span>
               </div>
               <input type="text" id="search-navbar" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>

            <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
               <span class="sr-only">Open menu</span>
               <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>
         </div>
            <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
               <div class="relative mt-3 md:hidden">
               
               <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
               </div>
               
               <input type="text" id="search-navbar" class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
               </div>
               
               <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                     <a href="#" class="nav-link">About</a>
                  </li>
                  <li>
                     { isLoggedIn &&
                        <>
                           <div>{currentWarrior.email}</div>
                           <div onClick={handleLogout} className='nav-link cursor-pointer'>Logout</div>
                        </>
                     }
                     { !isLoggedIn && 
                        <Link to="/login" class="nav-link">Login</Link>
                     }
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export { NavBar }