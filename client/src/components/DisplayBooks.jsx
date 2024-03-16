import React, {useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const DisplayBooks = props => {
  const {allBooks, setAllBooks} = props;
  const {user} = useUserContext();

  useEffect(() => {
    const config = {headers: {'Authorization': `Bearer ${user.token}`}}
    axios.get('http://localhost:8000/api/books', config)
      .then(res => setAllBooks(res.data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div className='BookContainer'>
      <h2>All Books</h2>
      {
        allBooks.map((book, i) => {
          return(
            <ul key={i}>
              <li><Link to={`/book/${book._id}`}>{book.title}</Link></li>
              <li>Added By: {book.createdBy}</li>
            </ul>
          )
        })
      }
    </div>
  )
};

export default DisplayBooks;