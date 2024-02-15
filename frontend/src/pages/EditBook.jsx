import React, { useState, useEffect } from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('Error fetching book');
        console.log(error);
      })
  }, [])
  const handleEditBook = () => {
    const data = {
    title: title,
    author: author,
    publishYear: publishYear,
  };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch(error => {
        setLoading(false);
        alert('Error creating book');
        console.log(error);
      }); 
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-8'>Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label htmlFor='title' className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type='text' 
            id='title' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className='border-2 border-gray-500 px-4 py-2 w-full' 
          />
        </div>
        <div className='my-4'>
          <label htmlFor='author' className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type='text' 
            id='author' 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'  
          />
        </div>
        <div className='my-4'>
          <label htmlFor='publishYear' className='text-xl mr-4 text-gray-500'>Published Year</label>
          <input 
            type='text' 
            id='publishYear' 
            value={publishYear} 
            onChange={(e) => setPublishYear(e.target.value)} 
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button onClick={handleEditBook} className='p-2 bg-sky-400 m-8'>
          Save
        </button>

      </div>
      
    </div>
  )
}

export default EditBook
