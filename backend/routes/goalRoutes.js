const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalcontroller');

//request, response
//usually response with a json

// router.get('/', getGoals); // same path
// router.post('/', setGoal); // same path
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

const { protect } = require("../middleware/authmiddleware")

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);


module.exports = router;