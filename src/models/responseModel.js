import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
       
    question: {
        type: String,
    },

    userAnswer: [{
        type: String
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
    }

})

const Response = mongoose.models.users || mongoose.model("response", responseSchema);

export default Response;