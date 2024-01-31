//when we use mongoose to interact with the database for these fucntions, we get back a promise
const asyncHandler = require("express-async-handler");


// Good practice for description

// @desc    Get goals
// @route:  GET /api/goals
// @access: Private
const getGoals = asyncHandler( async (req, res) => {
  //status is optional
  res.status(200).json( { message: "get goal" });
})

// @desc    Set goals
// @route:  POST /api/goals
// @access: Private
const setGoal = asyncHandler( async (req, res) => {
  if(!req.body.text) {
    res.status(400)
    throw new Error("Please provide goal");
  }
  
  //status is optional
  res.status(200).json( { message: "set goal" });
})


// @desc    Update goals
// @route:  PUT /api/goals/:id
// @access: Private
const updateGoal = asyncHandler( async (req, res) => {
  //status is optional
  res.status(200).json( { message: `update goal ${req.params.id}` });
})

// @desc    Delete goals
// @route:  DELETE /api/goals/:id
// @access: Private
const deleteGoal = asyncHandler( async (req, res) => {
  //status is optional
  res.status(200).json( { message: `delete goal ${req.params.id}` });
})

module.exports = { 
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
