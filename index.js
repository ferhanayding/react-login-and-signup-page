import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
// import UserSignUpPage from './pages/UserSignUpPage';
import LoginPage from './pages/LoginPage'
import reportWebVitals from './reportWebVitals';
import './i18next';
import LanguageSelector from './components/LanguageSelector';



ReactDOM.render(
<div className = "container">
 <LoginPage/>
 <LanguageSelector/>
</div>
  // <React.StrictMode>
   
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
