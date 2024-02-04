const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHander = require('express-async-handler')
const User = require("../models/usermodels")

//@desc Register new user
//@route POST api/users
//@access public

const registerUser = asyncHander (async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password){
    res.status(400)
    throw new Error("Please enter all fields")
  }

  //check if user exist
  const userExist = await User.findOne({email})
  if (userExist){
    res.status(400)
    throw new Error("User already exist")
  }

  //hash password
  const salt = await bcrypt.genSalt()
  const hashedpass = await bcrypt.hash(password, salt)

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedpass
  })

  if (user){
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new Error ("User data not valid")
  }
})

//@desc Authenticate a ser
//@route POST api/users/login
//@access public

const loginUser = asyncHander ( async (req, res) => {
  res.json({message: "login User"})
})

//@desc Get user
//@route POST api/users/me
//@access public
const getMe = asyncHander (async (req, res) => {
  res.json({message: "user data explasvnareuo"})
})

module.exports = {
  registerUser, 
  loginUser,
  getMe
}