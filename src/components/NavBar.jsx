import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { instance } from '../services/axios';


function NavBar() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [currentWarrior, setCurrentWarrior] = useState(0);
   const [jestkyToken, setJetskyToken] = useState('');
   const [sidebarOpen, setSidebarOpen] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const ref = useRef(null);

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

   useEffect(() => {
      const checkIfClickedOutside = e => {
        if (sidebarOpen && ref.current && !ref.current.contains(e.target)) {

         setSidebarOpen(false)
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
  
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
    }, [sidebarOpen])

   function logout() {
      setIsLoggedIn(false);
      setCurrentWarrior(0);
      localStorage.removeItem('warrior');
      localStorage.removeItem('jetsky_token');
   }

   function handleLogout() {
      setSidebarOpen(false);
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
      <nav className="nav">
         <div className="flex flex-wrap justify-between items-center mx-auto">
            <Link to="/" className="flex items-center">
               <img src="/logo-braver.png" className="h-6 sm:h-9 scale-90 " alt="Braver Logo" />
               <span className="self-center text-sm font-semibold whitespace-nowrap dark:text-white">Ask</span>
            </Link>
            

            { isLoggedIn &&
               <div className="flex md:order-1 ml-auto"> 
                  <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
                     <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                     <span className="sr-only">Search</span>
                  </button>
                  { !sidebarOpen &&
                     <button onClick={ () => { setSidebarOpen(true) }} data-collapse-toggle="dropdown-menu" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                     </button>
                  }
                  { sidebarOpen &&
                     <button onClick={ () => { setSidebarOpen(false) }} data-collapse-toggle="dropdown-menu" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                        <span className="sr-only">Open menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                     </button>
                  }
               </div>
            }

            
            <div className='sidebar-wrapper' ref={ref}>
               <aside className={`sidebar ${ sidebarOpen ? 'sidebar-opened' : 'sidebar-closed' } x-64`}>
                  <div className='overflow-y-auto py-4 px-3 bg-gray-50 rounded'>
                     <ul className='space-y-2'>
                        <li className='sidebar-button-close' onClick={() => setSidebarOpen(false)}>
                           <img className='close-icon' fill={'currentColor'} width={20} height={20} src={require('../assets/close-button-svgrepo-com.svg').default} />
                        </li>
                        <li className='pt-6'>
                           <Link to='/my-account' onClick={() => setSidebarOpen(false)} className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg'>
                              <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                              <span className="ml-3">My Account</span>
                           </Link>
                        </li>
                        <li>
                           { isLoggedIn && 
                              <Link onClick={handleLogout} className='nav-link cursor-pointer' href='#' className='flex items-center p-2 text-base font-normal text-gray-900 group-hover:text-gray-900 rounded-lg'>
                              <svg aria-hidden="true" className='w-6 h-6 text-gray-500 transition duration-75' fill="currentColor"><path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z"/></svg>
                                 <span className="ml-3">Logout</span>
                              </Link>
                           }
                        </li>
                     </ul>
                  </div>
               </aside>
            </div>
            
         
            <div className="justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
               <div className="relative mt-3">
               
               <div className="hidden flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
               </div>
               
               <input type="text" id="search-navbar" className="hidden block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
               </div>
               
               <ul className="flex flex-row p-1 mt-4 justify-between rounded-lg space-x-8 mt-0 text-sm font-medium border-0">
                  <li>
                     { !isLoggedIn &&
                        <>
                           <Link to="/sign-up" className="nav-link">Sign Up</Link> 
                        </>
                     }
                  </li>
                  <li>
                     { isLoggedIn &&
                        <>
                           <Link to='/my-account'>
                              <div className='text-blue-600 cursor-pointer'>{currentWarrior.nickname}</div>
                           </Link>
                        </>
                     }
                     { !isLoggedIn && 
                        <>
                           <Link to="/login" className="nav-link">Login</Link>
                        </>
                     }
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   )
}

export { NavBar }
