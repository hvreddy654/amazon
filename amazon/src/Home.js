import React from 'react';
import './Home.css';
import Product from './Product';

function Home() {
    return (
        <div className='home'>
            <div className='home_container'>
                <img className="home_image" src="https://m.media-amazon.com/images/I/61Os4fTnETL._SX3000_.jpg" />

                <div className='home_row'>
                    <Product
                        id={1}
                        title='the lean startup'
                        price={29.99}
                        image="https://images-na.ssl-images-amazon.com/images/I/51T-sMqSMiL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"
                        rating={1} />
                    <Product
                        id={2}
                        title='Newest Playstation 5'
                        price={960}
                        image="https://m.media-amazon.com/images/I/51Qt8XM4V+L._AC_UY327_QL65_.jpg"
                        rating={5} />
                </div>

                <div className='home_row'>
                    <Product
                        id={3}
                        title='Apple iPhone 13 Pro, 128GB, Sierra Blue'
                        price={1350.00}
                        image="https://m.media-amazon.com/images/I/610xvgzVUDL._AC_UY327_QL65_.jpg"
                        rating={4} />
                    <Product
                        id={4}
                        title='Kindle Oasis'
                        price={249.99}
                        image="https://m.media-amazon.com/images/I/61moEqqnwzL._AC_UY327_QL65_.jpg"
                        rating={5} />
                    <Product
                        id={5}
                        title='Lamborghini Sian Diecast'
                        price={299999.99}
                        image="https://m.media-amazon.com/images/I/61ISFQkQ1KL._AC_UL480_QL65_.jpg"
                        rating={5} />
                </div>

                <div className='home_row'>
                    <Product
                        id={6}
                        title='SAMSUNG 34-Inch Odyssey G5S'
                        price={259.99}
                        image="https://m.media-amazon.com/images/I/61XDeaOrrKL._AC_UY327_QL65_.jpg"
                        rating={5} />
                </div>
            </div>

        </div>
    )
}

export default Home