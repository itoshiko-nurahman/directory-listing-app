const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()

// import model
const Place = require('./models/place')

// connet mongoose databases
mongoose.connect('mongodb://localhost:27017/bestpoints')
.then(()=>{console.log('Connncted to Databases')})
.catch((err)=>{console.log(err)})

// set view engine and views directory
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// render halaman
app.get('/', (req, res)=>{
    res.render('home')
})

// app.get('/seed/place', async (req, res)=>{
//     const place = new Place({
//         title: 'Pantai Kuta',
//         price: 'Rp. 100.000',
//         description: 'Pantai yang indah',
//         location: 'Bali'
//     })

//     await place.save()
//     res.send(place)
// })

// setting port

app.listen(3000, ()=>{
    console.log('Server is running on http://localhost:3000')
})