const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
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

//middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

// render halaman
app.get('/', (req, res)=>{
    res.render('home')
})

app.get('/places', async (req, res)=>{
    const places = await Place.find()
    res.render('places/index',{places})
})

app.get('/places/create', (req, res)=>{
    res.render('places/create')
})

app.post('/places', async (req, res)=>{
    const place = new Place(req.body.place)
    await place.save()
    res.redirect('/places')
})

app.get('/places/:id', async(req, res)=>{
    const { id } = req.params
    const place = await Place.findById(id)
    res.render('places/show',{place})
})

app.get('/places/:id/edit', async(req, res)=>{
    const {id} = req.params
    const place = await Place.findById(id)
    res.render('places/edit', {place})
})

app.put('/places/:id', async(req, res)=>{
    await Place.findByIdAndUpdate(req.params.id, req.body.place)
    res.redirect('/places')
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