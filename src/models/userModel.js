import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    question: {
        type: String,
        required: [true, "Question is required"],
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    userAnswer: [{
    type: String
}]

})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;