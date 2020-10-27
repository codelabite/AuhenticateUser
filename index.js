const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const PORT = 220
//const url = 'mongodb://localhost/computerStudentDB'
const url = process.env.DATA_BASE
const CodeLab = require('./Router/router')

const app = express()


mongoose.connect(url, {useNewUrlParser: true}, { useUnifiedTopology: true }, ()=>{
  console.log(`Connected`)
})
const con = mongoose.connection

app.use(express.json())
 app.use('/', CodeLab)



app.listen(PORT, ()=>{
  console.log(`App is listening on Port: ${PORT}`)
})