import express from 'express'

const app = express()

// route de test/
app.get('/', (req, res) => {
    res.json({message : "l'app se lance youhou"})
})

export default app;
