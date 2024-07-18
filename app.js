const express = require('express')
const app = express()
const PORT = 8000
require('dotenv').config();
const cors = require('cors');
const db = require('./config/database')

const productRoutes = require('./routers/productRouters');

app.use(express.json());
app.use(cors())
app.use(productRoutes);

app.get('/', async (req, res) => {
    res.send('utama')
    console.log('succesfully conection to database')
})

app.post('/', async (req, res) => {
    try {
        res.status(200).send('door')
        console.log('masuk db')
    } catch (error) {
        res.status(500).send('gagal')

    }
})


app.listen(PORT, async () => {
    try {
        console.log(`Server is running at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})