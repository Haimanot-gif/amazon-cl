import './App.css';
// import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useStateValue } from './StateProvider';
import React, { useEffect } from 'react';
import { auth } from './firebase';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SharedItems from './SharedItems'
import Orders from './Orders';

const promise = loadStripe(
  'pk_test_51N2hGDAltQUdQBoi5ugfVzS0Du2pC2KcQWwxF8Ohqq3mN6X0i8rdwnAFx5hHbby5Bejlr5hKZKC4paVlHbebnyIs00n7ZhKnQ6'
);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      // console.log("THE USER IS >>> ", authUser);
      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);

  return (
  <Router>
    <div>
      <Routes>
        <Route path="/" element={<SharedItems />}>
          <Route path="/" element={<Home />} />
          <Route path="/Orders" element={<Orders />} />

          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <>
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route path="/Checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
</Router>
  );
}

export default App;
