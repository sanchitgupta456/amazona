import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { register } from '../actions/userActions';
import { useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo,loading,error} = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if(password!==confirmPassword)
        {
            alert('Passwords do not match');
        }
        else
        {
            dispatch(register(name,email,password));
        }
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
                    <h1>Register</h1>
                </div>
                <div>
                    {loading && <LoadingBox></LoadingBox>}
                    {error &&  <MessageBox variant="danger">{error}</MessageBox>}
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" placeholder="Enter Name" required onChange={e => setName(e.target.value)}></input>
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
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" required onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? {' '}
                        <Link to="/signin">Sign-In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}