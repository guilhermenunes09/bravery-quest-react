import React, { useEffect, useState } from 'react';

function MyAccount () {

   const [currentUser, setCurrentUser] = useState(0)
   const [file, setFile] = useState();

   useEffect(() => {
      setCurrentUser(JSON.parse(localStorage.getItem('warrior')))

   },[]);

   function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
   }

   return (
      <>
         <div className='grid grid-cols-2 gap-3'>
            <div className='m-auto'>
               
               <div className='avatar-template'>
                  { file &&
                     <img src={file} />
                  }
                  { !file &&
                     <>G</>
                  }
               </div>
               
               <div className='text-center mt-2 text-lg'>
                  {currentUser.nickname}
               </div>

               <input onChange={handleChange} type='file' className='input-change-image' />
            
            
            </div>
            <div></div>
         </div>
      </>
   )
}

export { MyAccount };