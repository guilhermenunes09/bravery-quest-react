import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import './questions/questions.css';
import './questions/questions_show.css';
import './account/my_account.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './hooks/ScrollToTop';
import {
  RecoilRoot,
} from 'recoil';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <Router> 
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  </RecoilRoot>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
