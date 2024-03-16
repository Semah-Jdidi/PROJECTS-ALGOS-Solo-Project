import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateBook from '../components/CreateBook';
import DisplayBooks from '../components/DisplayBooks';
import { useUserContext } from '../hooks/useUserContext';

const Dashboard = props => {
  const [allBooks, setAllBooks] = useState([]);
  const {user, dispatch} = useUserContext();
  const nav = useNavigate();

  const logoutHandler = () => {
    axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .then(res => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'})
        nav('/')
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <div className='NavBar'>
        <h1>Welcome, {user.firstName}</h1>
        <button className='LogoutBtn' onClick={logoutHandler}>Log Out</button>
      </div>
      <div className='Container'>
        <CreateBook allBooks={allBooks} setAllBooks={setAllBooks} />
        <DisplayBooks allBooks={allBooks} setAllBooks={setAllBooks} />
      </div>
    </div>
  )
}

export default Dashboard;