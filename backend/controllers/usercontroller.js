const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require("../models/usermodels")

//@desc Register new user
//@route POST api/users
//@access public

const registerUser = asyncHandler (async (req, res) => {
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
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error ("User data not valid")
  }
})

//@desc Authenticate a ser
//@route POST api/users/login
//@access public
const loginUser = asyncHandler ( async (req, res) => {
  const { email, password } = req.body

  //check if user exist
  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error ("Invalid Credentials")
  }
})

// Generate JWT 
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


//@desc Get user
//@route POST api/users/me
//@access public
const getMe = asyncHandler (async (req, res) => {
  const {_id, name, email} = await User.findById(req.user.id)

  res.status(200).json(req.user)
})

module.exports = {
  registerUser, 
  loginUser,
  getMe
}