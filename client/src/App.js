import React, { useState} from 'react'
import './App.css';
import Axios from 'axios' 

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')

  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName: movieName,
      movieReview: review,
    }).then(()=>{
      alert('successfully inserted')
    });
    const movieN = movieName;
    alert(movieN)
  }

  return (
    <div className="form">
      <h1>Crud app</h1>
      <label>Movie name</label>
      <input type="text"
       name="movieName"
       onChange={(e)=>{
         setMovieName(e.target.value)
       }}></input>
      <label>Review</label>
      <input type="text"
       name="review"
       onChange={(e)=>{
        setReview(e.target.value)
      }}></input>
      <button onClick={submitReview}>Submit</button>
    </div>
  );
}

export default App;
