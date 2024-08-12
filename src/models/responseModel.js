import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({

    question: {
        type: String,
    },

    userAnswer: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

})

const Response = mongoose.models.response || mongoose.model("response", responseSchema);

export default Response;