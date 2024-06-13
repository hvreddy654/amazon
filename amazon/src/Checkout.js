import React from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal'

function Checkout() {
  const [{basket, user },dispatch] = useStateValue();
  return (
    <div className='checkout'>
      <div className='checkout_left'>
        <img className='checkout_ad' 
        src='https://m.media-amazon.com/images/I/611PK9lVW7L._SX3000_.jpg'
        alt=''
        />

        <div>
          <h2 className='checkout_title'>
            <h3>Hello, {user?.email}</h3>
            Your shopping basket
          </h2>

          {basket.map(item => (
            <CheckoutProduct
            id ={item.id}
            title ={item.title}
            image ={item.image}
            price ={item.price}
            rating ={item.rating}
            />
          ))}

          {/* checckout product */}
          {/* basket items */}

        </div>     
      </div>

      <div className='checkout_right'>
        {/* the subtotal go here */}
        <h2>The subtotal go here</h2>
        <Subtotal/>

      </div>
    </div>
  )
}

export default Checkout