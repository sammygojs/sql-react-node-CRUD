const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createPool({
    host: `localhost`,
    user: 'root',
    password: 'secret1234',
    database: 'cruddb'
})
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.get('/api/get', (req,res)=>{
    const sqlInsert = 
    "SELECT * FROM movie_reviews;"
    //it is compulsory to write err first and result second
    db.query(sqlInsert,(err,result)=>{
        console.log(`sqlInsert: `, sqlInsert )
        console.log(`result: `,result)
        console.log(`err: `,err)
        res.send(result)
    })
})

app.post('/api/insert',(req,res)=>{
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    console.log("movieName: ", movieName)
    console.log("movieReview: ", movieReview)


    const sqlInsert = 
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);"
    db.query(sqlInsert, [movieName,movieReview], (err,result)=>{
        console.log(`sqlInsert: `, sqlInsert )
        console.log(`result: `,result)
        console.log(`err: `,err)
        
     })
})

app.delete('/api/delete/:movieName',(req,res)=>{
    const movieName = req.params.movieName
    const sqlInsert = 
    "DELETE FROM movie_reviews WHERE movieName = ?;"
    db.query(sqlInsert, movieName, (err,result)=>{
        console.log(`sqlInsert: `, sqlInsert )
        console.log(`result: `,result)
        console.log(`err: `,err)
        
     })
    console.log(movieName)
})

app.put(`/api/update`,(req,res)=>{
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    // console.log("movieName: ", movieName)
    // console.log("movieReview: ", movieReview)
    const sqlInsert = 
    "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?"
    db.query(sqlInsert,[movieReview,movieName],(err,result)=>{
        console.log(`sqlInsert: `, sqlInsert )
        console.log(`result: `,result)
        console.log(`err: `,err)
    })

})

app.listen(3001,()=> console.log(`listening on port 3001`))

