const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express()
const env = require('dotenv');
const tournament = require('./controller/tournament');
const participents = require('./controller/participents');


env.config()
require('./db/dbConn')

 app.use(cors("*"))
 app.use(bodyparser.json())
 app.use(express.urlencoded({extended:false}))
 app.use(express.json());


 app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next()
  })

app.use('/tournament',tournament)
app.use('/participant',participents)




 app.listen(5000,(err)=>{
    if(err) throw err
    console.log(`connection 5000`)
 })



 module.exports = app