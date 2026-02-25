import Quote from "../models/quoteModel.js"

const defaultQuotes = [
    {quote : "voler c'est voler, repeindre ses volets", author : "Pierre de la Source"},
    {quote : "tous les chemins n'amassent pas mousse", author : "Pierre de la Source"},
    {quote : "passer du cocalight" , author : "Pierre de la Source"},
    {quote : "pierre qui roule mène à Rome", author : "Pierre de la Source"}
]

export const getRandomQuote = async (req, res) => {
    try {
        // countDocuments ca sert à compter le nb d'entrées dans la bdd
        const count = await Quote.countDocuments()

        // si la bdd est vide on prend une phrase au hasard qui est enregistré en dur. 
        if (count===0) {
            const randomIndex = Math.floor(Math.random() * defaultQuotes.length)
            return res.status(200).json(defaultQuotes[randomIndex])
        }

        // sino récupérer aléatoirement depuis mongoDB
        const random = Math.floor(Math.random() * count)
        // SELECT * FROM quote WHERE id = :random
        const quote = await Quote.findOne().skip(random)
        res.status(200).json(quote)
    

    } catch(error){
        console.error("erreur de quote : " .error)
    }
}

export const getAllQuotes = async (req, res) =>{
    try {
        const quotes = await Quote.find({})
        res.status(200).json(quotes)
    } catch (error) {
        console.error("erreur de récuperation : " .error)
        res.status(500).json({message : error.message})
    }
}


export const createQuote = async (req, res) => {
    try{
        const { quote, author } = req.body

        if (!quote || !author) {
            res.status(400)
            throw new Error ("veuillez fournir la citation et l'auteur")
        }

        const quoteRegistered = await Quote.create({quote, author})
        res.status(201).json(quoteRegistered)

    } catch (error) {
        console.error("erreur d'enregistrement : " .error)
        res.status(500).json({message : error.message})
    }
}

export const deleteQuote = async (req, res) => {
    try {
        // on récupère l'id des paramètres de l'url
        const quote = await Quote.findById(req.params.id)

        if (!quote) {
            res.status(404)
            throw new Error('citation non trouvée')
        }
        await quote.deleteOne()
        res.status(200).json({message : 'citation supprimée'})
    } catch (error) { 
        console.error("erreur de suppression : " .error)
        res.status(500).json({message : error.message})
    }
}

export const updateQuote = async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id)
        if (!quote) {
            res.status(404)
            throw new Error('citation non trouvée')
        }
        const updatedQuote = await Quote.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {new: true, runValidators: true}
        )
        res.status(200).json(updatedQuote)

    } catch (error) { 
        console.error("erreur de modification : " .error)
        res.status(500).json({message : error.message})
    }
}