import React, {useState} from 'react';
import axios from 'axios';
import { useUserContext } from '../hooks/useUserContext';

const CreateBook = props => {
  const [book, setBook] = useState({
    title: '',
    description: ''
  });

  const {allBooks, setAllBooks} = props;
  const {user} = useUserContext();

  const changeHandler = e => {
    setBook({...book, [e.target.name]: e.target.value});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const config = {headers: {'Authorization': `Bearer ${user.token}`}}
    axios.post('http://localhost:8000/api/books/create', book, config)
      .then(res => {
        console.log(res)
        setAllBooks([...allBooks, res.data])
        setBook({title:'', description:''})
      })
      .catch(err => console.log(err))
  };


  return (
    <div>
      <h2>Add A New Book</h2>
      <form className='BookForm' onSubmit={submitHandler}>
        <label>
          Title
          <input type="text" name='title' value={book.title} onChange={changeHandler} />
        </label>
        <label>
          Description
          <textarea type="text" name='description' value={book.description} onChange={changeHandler} />
        </label>
        <button className='FormBtn'>Submit</button>
      </form>
    </div>
  )
};

export default CreateBook;
