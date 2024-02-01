//when we use mongoose to interact with the database for these fucntions, we get back a promise
const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');

const Goal = require("../models/goalmodels");
// Good practice for description

// @desc    Get goals
// @route:  GET /api/goals
// @access: Private
const getGoals = asyncHandler( async (req, res) => {
  const goals = await Goal.find()
  //status is optional
  res.status(200).json(goals);
})

// @desc    Set goals
// @route:  POST /api/goals
// @access: Private
const setGoal = asyncHandler( async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error("Please provide goal");
  }
  
  const goal = await Goal.create({
      text: req.body.text}
  );

  //status is optional
  res.status(200).json( goal );
})


// @desc    Update goals
// @route:  PUT /api/goals/:id
// @access: Private
const updateGoal = asyncHandler( async (req, res) => {
  //status is optional
  // (new mongoose.Types.ObjectId(author))
  const goal = await Goal.findById(req.params.id)

  if (!goal){
    res.status(400)
    throw new Error("Goal not found")
  }

  const updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(200).json( updatedgoal );
})

// @desc    Delete goals
// @route:  DELETE /api/goals/:id
// @access: Private
const deleteGoal = asyncHandler( async (req, res) => {
  //status is optional
  const goal = await Goal.findById(req.params.id)

  if (!goal){
    res.status(400)
    throw new Error("Goal not found")
  }

  const deletedgoal = await Goal.findByIdAndDelete(req.params.id)

  res.status(200).json( { message: `delete goal ${req.body.text}` });
})

module.exports = { 
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
