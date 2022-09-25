const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: String, 
        default: "Basic",
        required: true
    },
    firstName: {
        type: String, 
        required: false
    },
    lastName: {
        type: String, 
        required: false
    },
    email: {
        type: String, 
        required: false    },

}, 
{
    timestamps: true
})

const User = Mongoose.model("User", UserSchema)
module.exports = User