import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { signIn } from '../actions/userActions';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo,loading,error} = userSignIn;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signIn(email,password));
    };

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[props.history,redirect,userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error &&  <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? {' '}
                        <Link to="/register">Create Your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}