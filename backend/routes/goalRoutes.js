const express = require('express');
const router = express.Router();
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalcontroller');

//request, response
//usually response with a json

// router.get('/', getGoals); // same path
// router.post('/', setGoal); // same path
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);


module.exports = router;