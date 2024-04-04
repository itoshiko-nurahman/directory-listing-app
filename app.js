const express = require('express')
const path = require('path')
const app = express()

// set view engine and views directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// render halaman
app.get('/', (req, res)=>{
    res.render('home')
})

// setting port
app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000')
})