import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { auth } from './firebase';
import './Login.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    // useHistory
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();
    const navigate = useNavigate();
    const signin = e => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>
        {
            navigate('/');
        })
        
        //firebase login
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth){
                    navigate('/');
                }
            })
            .catch(error => alert(error.message))
        //do firebase register
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png'></img>
            </Link>

            <div className='login_container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button onClick={signin} type='submit' className='login_signinbutton'>Sign in</button>
                </form>
                <p>By continuing, you agree to Amazon clone Conditions of Use.Please see our  Privacy Notice,our Cookies notice and our interest based ads.</p>

                <button onClick={register} className='login_registerbutton' >Create your Amazon Account</button>
            </div>



        </div>
    )
}

export default Login