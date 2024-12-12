const express = require('express');
const {JWT_SECRET, auth } = require('./auth');
const bcrypt = require("bcrypt");
const {UserModel , TodoModel} = require("./config/db");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const dbConnectionString = process.env.DB_STRING;
const saltRounds = 10;

try{
    mongoose.connect(dbConnectionString);
    console.log("Database Connected");
}catch(e)
{
    console.log(e);
}




const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
  
    // Validate inputs
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "All fields (email, username, password) are required",
      });
    }
  
    try {
      // Check if the email already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          message: "Email already in use: Signup Unsuccessful",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create the new user
      await UserModel.create({
        email,
        password: hashedPassword,
        name: username,
      });
  
      res.status(201).json({
        message: "Signup Successful",
      });
    } catch (err) {
      console.error("Error during signup:", err);
      res.status(500).json({
        message: "Internal server error: Signup Unsuccessful",
      });
    }
  });


app.post('/signin', async function(req,res){
    email = req.body.email;
    password = req.body.password;
    const user = await UserModel.findOne({
        email : email,
    })
    if (user != null)
    {
        if (await bcrypt.compareSync(password,user.password))
            {
                console.log(user); 
                const token = jwt.sign({
                    id : user._id
                }, JWT_SECRET);
        
                res.json({
                    token :token
                })
            }else
            {
                res.json({
                    message :"user not found"
                })
            }
    }
    else
    {
        res.json({
            message :"user not found"
        })
    }
    

})
app.post('/todo',auth, async function(req,res){
    user_Id = req.user_Id;
    title = req.body.title;
    done = false;
    if(user_Id && title){
        await TodoModel.create({
            title: title,
            done: done,
            userId: user_Id
        });

        res.json({
            message : "Todo Inserted Succesfully"
        })
    }
    else{
        res.json({
            message : "Operation Unsuccesful"
        })
    }

})
app.get('/todos',auth, async function(req,res){
    user_Id = req.user_Id;
    const todos = await TodoModel.find({
        userId: user_Id
    });
    res.json(
        todos
    )
})
app.post('/todosupdate',auth, async function(req,res){
    user_Id = req.user_Id;
    title = req.body.title;
    await TodoModel.findOneAndUpdate({
        userId: user_Id,
        title: title},
    {done : true});

    const todos = await TodoModel.findOne({
        userId: user_Id,
        title: title
    });

    res.json(
        todos
    )
})

app.listen(3000);