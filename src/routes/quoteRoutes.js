import express from 'express'
import { createQuote, deleteQuote, getAllQuotes, getRandomQuote, updateQuote } from '../controllers/quoteController.js'

const router = express.Router()

// on va pouvoir gérer les routes
//                   route, middleware (optionnel), controller => fonction qui vient du controller
router.get('/', getRandomQuote)

router.get('/all', getAllQuotes)

router.post('/', createQuote)

router.delete('/:id', deleteQuote)

router.put('/:id', updateQuote)

export default router