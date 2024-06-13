import React from 'react';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ basket,user } , dispatch] = useStateValue();

    const handleAuthentication= () =>{
        if(user){
            auth.signOut();
        }
    }
    return (
        <div className='header'>
            <Link to = "/">
                {/* // eslint-disable-next-line jsx-a11y/alt-text */}
                <img className="header_logo" src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' />
            </Link>
            <div className='header_search'>
                <input className='header_searchInput' type="text" />
                <SearchIcon className='header_searchIcon' />
                {/*Logo */}
            </div>

            <div  className='header_nav'>
                <Link to={!user && '/login'}>
                <div onClick={handleAuthentication} className='header_option'>
                    <span className='header_optionLineone'>Hello {user? user.email : 'Guest'}</span>
                    <span className='header_optionLinetwo'>{user ? 'Sign out' :'Sign-in'}</span>
                </div>
                </Link>

                <Link to='/orders'>
                <div className='header_option'>
                    <span className='header_optionLineone'>Returns</span>
                    <span className='header_optionLinetwo'>& Orders</span>
                </div>
                </Link>

                <div className='header_option'>
                    <span className='header_optionLineone'>Your</span>
                    <span className='header_optionLinetwo'>Prime</span>
                </div>


                <Link to='/checkout'>
                <div className='header_optionbasket'>
                    <ShoppingBasketIcon/>
                    <span className='header_optionLinetwo header_basketcount'>{basket?.length}</span>
                </div>
                </Link>


            </div>
        </div>
    )
}

export default Header