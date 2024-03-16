import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const LoginRegister = props => {
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);
  const [loginError, setLoginError] = useState({message:''})
  const {dispatch} = useUserContext();
  const nav = useNavigate();
  
  const newUserChangeHandler = e => {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  };

  const loginChangeHandler = e => {
    setUserLogin({...userLogin, [e.target.name]: e.target.value});
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register', newUser, {withCredentials: true,})
      .then(res => {
        const user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user});
        nav('/dashboard');
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        if(errorResponse){
          const errorarr = [];
          for (const key of Object.keys(errorResponse)) {
            errorarr.push(errorResponse[key].message)
          };
          setErrors(errorarr);
        }
      });
  };

  const loginHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', userLogin, {withCredentials: true,})
      .then(res => {
        const user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({type: 'LOGIN', payload: user});
        nav('/dashboard');
      })
      .catch(err => {
        const error = err.response.data.message
        setLoginError({message:error})
      });
  };

  return (
    <div className='Container'>
      <div>
        <h2>Registration</h2>
        <form className='UserForm' onSubmit={registrationHandler}>
          <label>
            First Name
            <input type="text" name='firstName' value={newUser.firstName} onChange={newUserChangeHandler} />
          </label>
          <label>
            Last Name
            <input type="text" name='lastName' value={newUser.lastName} onChange={newUserChangeHandler} />
          </label>
          <label>
            Email
            <input type="text" name='email' value={newUser.email} onChange={newUserChangeHandler} />
          </label>
          <label>
            Password
            <input type="password" name='password' value={newUser.password} onChange={newUserChangeHandler} />
          </label>
          <label>
            Confirm Password
            <input type="password" name='confirmPassword' value={newUser.confirmPassword} onChange={newUserChangeHandler} />
          </label>
          {
            errors.map((err, i) => {
              return( 
                <p className='Warning' key={i}>{err}</p>
              )
            })
          }
          <button className='FormBtn'>Register</button>
        </form>
      </div>
      <div>
        <h2>Login</h2>
        <form className='UserForm' onSubmit={loginHandler}>
          <label>
            Email
            <input type="text" name='email' value={userLogin.email} onChange={loginChangeHandler} />
          </label>
          <label>
            Password
            <input type="password" name='password' value={userLogin.password} onChange={loginChangeHandler} />
          </label>
          <p className='Warning'>{loginError.message}</p>
          <button className='FormBtn'>Log In</button>
        </form>
      </div>
    </div>
  )
};

export default LoginRegister;

