import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
    {
        quote : {
            type : String,
            required : [true, 'veuillez ajouter le texte de la citation']
        },
        author : {
            type : String, 
            required : [true, 'veuillez ajouter un auteur à la citation']
        }
    }
)

const Quote = mongoose.model('Quote', quoteSchema)

export default Quote
