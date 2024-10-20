import mongoose from "mongoose";

const ChatAppSchema = new mongoose.Schema({
    username: {
        type: String,
        min: 2,
        max: 50,
        unique: true,
        required: true
    },
    image: String,
    password: String,
    token: {
        type: String
    },
    refreshToken: {
        type: String
    }

}
    , {
        //configuration options
        timestamps: true,   //created at,updated at columns
        autoCreate: true,
        autoIndex: true

    })

export const CasUsers = mongoose.model("UserCas", ChatAppSchema) 
