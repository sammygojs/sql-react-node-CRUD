import React, { useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios' 

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieList, setMovieList] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      // console.log(response.data)
      setMovieList(response.data)})
  },[])


  const submitReview = () =>{
    Axios.post('http://localhost:3001/api/insert',{
      movieName: movieName,
      movieReview: review,
    }).then(
      setMovieList([...movieList,{movieName:movieName, movieReview:review} ])
      // alert('successfully inserted')
      
      );
    // const movieN = movieName;
    // alert(movieN)
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
      { movieList.map((val)=>{
      return <h1>
      Moviename: {val.movieName} | Movie Review: {val.movieReview}
      </h1>
    }) }
    </div>

    
  );
}

export default App
