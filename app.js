const express  = require('express')
require('dotenv').config();
const mongoose = require('mongoose')
const morgan   = require('morgan')
const bodyparser = require('body-parser')
const { Db } = require('mongodb')
const { connected } = require('process')
const cors = require('cors')
const authroute = require('./routes/userRoutes')
mongoose.connect('mongodb://localhost:27017/virgobackend')


const db = mongoose.connection
db.on('error',(err)=>{
        console.log(err)
})
db.once('open',()=>{
    console.log('database is connected')
})

const app =express()
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const PORT = process.env.PORT || 5001
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use('/',authroute)