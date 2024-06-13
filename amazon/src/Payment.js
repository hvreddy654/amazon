import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useStateValue } from './StateProvider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import {db} from './firebase';



function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const history = useNavigate();
    

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [succeeded,setSucceded] =useState(false);
    const[processing,setProcessing] = useState("");
    
    const [clientSecret,setClientSecret] = useState(true);
    

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log("The secret is>>>",clientSecret)

    
    const handleSubmit = async(event) => {
        event.preventDefault();
        setProcessing(true);
        const payload =await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            //intent =confirmation
            

            db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })
            setSucceded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history('/orders',{replace:true})
        })

    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "")
    }



    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout(<Link to="/checkout">{basket.length} Items)</Link>
                </h1>
                {/* payment section */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Dallas Texas</p>
                    </div>
                </div>
                {/* review the items */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>review items and delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {/* payments use */}
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}

                    </div>
                </div>
                {/* payment-section payment method */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                        {/* stripe methods will go here */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />

                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing||disabled||succeeded}>
                                    <span>{processing ?<p>Processing</p>: "Buy now" }</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment