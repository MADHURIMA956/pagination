const express = require('express');

const User = require('../models/users.models');

const sendMail =  require('../utils/send-mail')

const router = express.Router();

router.post('/' , async (req, res) => {
    try {
        const users = await User.create(req.body);

        sendMail(
          "abc@company.com" ,
          `${req.body.email}`,
          ` Welcome to ABC system ${req.body.first_name}  ${req.body.last_name}`,
          ` Hi ${req.body.first_name}, Please confirm your email address`,
          ` <h1>Hi ${req.body.first_name}, Please confirm your email address</h1>`,
           [
            {
              path:'C:\Users\HP\Documents\GitHub\pagination\src\name.txt',
             
            }
          ]
         );

        return res.status(201).send(users);
      } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
})

router.get('/' , async (req, res) => {
    try {

        const page = +req.query.page || 1;
        const size = +req.query.size || 2;
        const skip = (page - 1)/2;

        const users = await User.find({}).skip(skip).limit(size).lean().exec();
    
        const totalpages = Math.ceil(
          (await User.find().countDocuments())
        );

        return res.json({users,totalpages});

      }catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
      }
})

module.exports = router;