import React, { useState, useEffect} from 'react'
import './App.css';
import Axios from 'axios' 

function App() {
  const [movieName, setMovieName] = useState('')
  const [review, setReview] = useState('')
  const [movieList, setMovieList] = useState([])
  const [newReview, setNewReview] = useState('')

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      // console.log(response.data)
      setMovieList(response.data)})
  },[])


  const deleteReview = (name) =>{
    Axios.delete(`http://localhost:3001/api/delete/${name}`)
    .then(()=>{alert('deleted')})
    // console.log("name: ",name)
    let idx = movieList.map((movie)=>movie.movieName).indexOf(name)
    console.log(idx)
    const temp = [...movieList];
    temp.splice(idx,1)
    setMovieList(temp)
    // setMovieList(movieList.splice(idx,1))
    // console.log("idx: ",idx)
  }

  const updateReview = (name) =>{
    Axios.put('http://localhost:3001/api/update',{
      movieName: name,
      movieReview: newReview,
    })
    const temp = [...movieList];
    let idx = movieList.map((movie)=>movie.movieName).indexOf(name)
    temp.splice(idx)
    setMovieList([...temp,{movieName:name,movieReview:newReview}])

  }

  const submitReview = () =>{
    document.getElementById("movieName").value = "";
    document.getElementById("review").value = "";
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
       id="movieName"
       onChange={(e)=>{
         setMovieName(e.target.value)
         e.preventDefault();
       }}></input>
      <label>Review</label>
      <input type="text"
       name="review"
       id="review"
       onChange={(e)=>{
        setReview(e.target.value) 
        e.preventDefault();
      }}></input>
      <button onClick={submitReview}>Submit</button>
      { movieList.map((val,index)=>{
      return <div class="center">
      <ul>
      <li key={index}>
      <h1>Moviename: {val.movieName}</h1>
      <p>Movie Review: {val.movieReview}</p>
      <input type="text" onChange={(e)=>{setNewReview(e.target.value);e.preventDefault()}} id="updateText"></input>
      <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
      <button onClick={()=>{updateReview(val.movieName)}}>Update</button>
      </li>
      </ul>
      </div>

    }) }
    </div>

    
  );
}

export default App
