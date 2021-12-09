const express = require('express');

const User = require('../models/users.models');

const sendMail =  require('../utils/send-mail')



const router = express.Router();

router.post('/' , async (req, res) => {
    try {
        const users = await User.create(req.body);

        const user_array = [
          "admin1@a.com",
          "admin2@a.com",
          "admin3@a.com",
          "admin4@a.com",
          "admin5@a.com",
        ]

        const user_string = user_array.join(',') 
        sendMail(
          "madhurimabanerjee97@gmail.com" ,
          req.body.email,
          ` Welcome to ABC system ${req.body.first_name}  ${req.body.last_name}`,
          ` Hi ${req.body.first_name}, Please confirm your email address`,
          ` <h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`,
          
         );
         sendMail(
          "madhurimabanerjee97@gmail.com" ,
           user_string,
          ` ${req.body.first_name}  ${req.body.last_name} has registered with us`,
          ` Hi ${req.body.first_name}, Please confirm your email address`,
          ` <h1> Please welcome ${req.body.first_name} ${req.body.last_name} </h1>`,
          
         );

        return res.status(201).send(users);
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
})

router.get('/' , async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const size = +req.query.size || 5;
        const skip = (page - 1)/2;

        const users = await User.find({}).skip(skip).limit(size).lean().exec();
    
        const totaluser = Math.ceil(
          (await User.find().countDocuments())
        );

        return res.json({users,totaluser});

      }catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
})

module.exports = router;


// [
//   {
//     path:'C:\Users\HP\Documents\GitHub\pagination\src\name.txt',
   
//   }
// ]