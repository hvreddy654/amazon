import './App.css';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe('pk_test_51LO0NpGWffcGuxyvSlt5SAbCsCh7Fp6kkEevcoeS9ULE3hLvGB0byGRU8Dn2nqSUDiCRVxAzj9ByyRxuqGAigz0I00pUY4ng60');


function App() {
  const[{},dispatch] = useStateValue();
  useEffect(() =>{
    //will only run when the app component loads
    auth.onAuthStateChanged(authUser =>{
      console.log("The user is >>>",authUser);
      if(authUser){
        //the user logged in 
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })
        //the user is logged out
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route exact path="/" element={<><Header/><Home/></>}/>
          <Route exact path="/orders" element={<><Header/><Orders/></>}/>
          <Route exact path="/checkout" element={<><Header/><Checkout/></>}/>
          
          <Route path="/payment" element={<><Header/><Elements stripe ={promise}><Payment/></Elements></>}/> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// class Homepage extends React.Component {
//   render() {
//      return (
//         <div>
//            <Header/>
//            <Home/>
//         </div>
//      )
//   }
// }

// class Checkoutpage extends React.Component {
//   render() {
//      return (
//         <div>
//            <Header/>
//            <Checkout/>
//         </div>
//      )
//   }
// }
