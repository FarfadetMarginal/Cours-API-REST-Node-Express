import process from 'process'
import app from './src/app.js'
import connectDB from './src/config/db.js'

// connexion à la bdd MongoDB
connectDB()

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Serveur lancé sur https://localhost:${PORT}`)
})
 