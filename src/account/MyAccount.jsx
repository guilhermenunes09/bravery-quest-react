import React, { useEffect, useState } from 'react';
import { instance } from '../services/QuestionsService';

function MyAccount () {
   const [file, setFile] = useState();
   const [user, setUser] = useState();

   useEffect(() => {
      const userId = JSON.parse(localStorage.getItem('warrior')).id

      const getUser = (id) => {
         instance.get(`users/${id}`)
            .then(res => {
               setUser(res.data);
            })
      }
      
      getUser(userId);

   },[]);

   function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
   }

   return (
      <>
         <div className='grid md:grid-cols-2 gap-3 place-items-center'>
            <div className='md:border-r-2'>
               <div className='flex justify-center'>
                  <div className='avatar-template'>
                     <img src={`${process.env.REACT_APP_LOCALHOST}/${user && user.avatar}`} />
                  </div>
               </div>

               <div>
                  <input onChange={handleChange} type='file' className='input-change-image' />
               </div>
            </div>
            <div className='text-center'>
               <div className='flex-row'>
                  <span className='nickname-title'>{user && user.nickname}</span>
                  <div className='small-text'><small>{user && user.email}</small></div>
               </div>
            </div>
         </div>
      </>
   )
}

export { MyAccount };