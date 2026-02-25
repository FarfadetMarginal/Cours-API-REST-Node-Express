import express from 'express'
import dotenv from 'dotenv'
import quoteRoutes from './routes/quoteRoutes.js'

dotenv.config()

const app = express()

// body parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//on définit les Routes API
app.use('/api/quote', quoteRoutes) 

// route de test/
app.get('/', (req, res) => {
    res.json({message : "l'app se lance youhou"})
})


export default app;
