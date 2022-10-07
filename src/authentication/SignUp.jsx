import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from '../services/QuestionsService';
import { Login } from "./Login";

function SignUp() {

   const [nickname, setNickname] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigate = useNavigate();


   function handleSubmit(e) {
      e.preventDefault();
      instance.post(`/users`, {
         users: {
            nickname: nickname,
            email: email,
            password: password
         }
      })
      .then((res) => {
         login(res.data.email);
      });
   }

   function login(__email) {
      instance.post(`/api_keys`, {}, {
         auth: {
            username: __email,
            password: password
         }
      })
      .then((res) => {
         localStorage.setItem('jetsky_token', JSON.stringify(res.data.api_key));
         localStorage.setItem('warrior', JSON.stringify(res.data.warrior));
         navigate(`/`);
      });
   }

   function handleChangeNickname(e) {
      setNickname(e.target.value);
   }

   function handleChangeEmail(e) {
      setEmail(e.target.value);
   }

   function handleChangePassword(e) {
      setPassword(e.target.value);
   }
   
   return(
      <>
         <div className='card-password'>
            <form className="form-container">
               <div className='font-medium mb-6'>Sign Up</div>
               <div className="block">
                  <div class="">
                     <label>Your name or nickname</label>
                     <input onChange={handleChangeNickname} id="questions-title" type="text" placeholder="maverick" className="input-field" autoFocus />
                  </div>
                  
                  <div class="">
                     <label>Your email</label>
                     <input onChange={handleChangeEmail} id="questions-title" type="text" placeholder="name@mail.com" className="input-field" autoFocus />
                  </div>
                  
                  <div class="">
                     <label>Password</label>
                     <input onChange={handleChangePassword} id="user-password" type="password" placeholder="••••••••" className="input-field" autoFocus />
                  </div>
               </div>
            
               <button onClick={handleSubmit} class="form-button-login">
                  Sing Up
               </button>
            </form>
         </div>
      </>
   )
}

export { SignUp }