const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    first_name: {type : String, required: true},
    last_name:{type: String ,required: false},
    email:{type: String ,required: true, unique:true},

},{
    versionKey :false,
    timestamps:true,
});

module.exports = model('users' , userSchema);