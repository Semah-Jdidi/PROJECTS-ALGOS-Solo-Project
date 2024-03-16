import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const BookDetails = props => {
  const [book, setBook] = useState({});
  const {id} = useParams();
  const {user, dispatch} = useUserContext();
  const isOwner = user._id == book.userId;
  const nav = useNavigate();

  useEffect(() => {
    const config = {headers: {'Authorization': `Bearer ${user.token}`}}
    axios.get(`http://localhost:8000/api/books/${id}`, config)
      .then(res => setBook(res.data))
      .catch(err => console.log(err))
  },[])

  const changeHandler = e => {
    setBook({...book, [e.target.name]: e.target.value});
  };

  const updateHandler = (e) => {
    e.preventDefault();
    const config = {headers: {'Authorization': `Bearer ${user.token}`}}
    axios.post(`http://localhost:8000/api/books/edit/${id}`, book, config)
      .then(res => nav('/dashboard'))
      .catch(err => console.log(err))
  };

  const deleteHandler = () => {
    const config = {headers: {'Authorization': `Bearer ${user.token}`}}
    axios.delete(`http://localhost:8000/api/books/delete/${id}`, config)
      .then(res => nav('/dashboard'))
      .catch(err => console.log(err))
  };

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
      <div className='BookDetailsContainer'>
        {!isOwner && (
          <div>
            <h3>{book.title}</h3>
            <p>description : {book.description}</p>
          </div>
        )}
        {isOwner && (
          <div>
            <form className='BookDetailsForm' onSubmit={updateHandler}>
              <label>
                <input type="text" name='title' value={book.title} onChange={changeHandler} />
              </label>
              <label>
                Description : 
                <textarea type="text" name='description' value={book.description} onChange={changeHandler} />
              </label>
              <div className='BtnHandler'>
                <button className='UpdateBtn'>Update</button>
                <button className='DeleteBtn' onClick={deleteHandler}>Delete</button>
              </div>
            </form>
          </div>
        )}
        <ul>
          <li>Added By: {book.createdBy}</li>
          <li>Added on: {new Date(book.createdAt).toLocaleString()}</li>
          <li>Updated At: {new Date(book.updatedAt).toLocaleString()}</li>
        </ul>
        <Link className='HomeLink' to={'/dashboard'}>Back</Link>
      </div>
    </div>
  )
};

export default BookDetails;