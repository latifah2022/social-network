const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// /api/Thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/Thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// api/Thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// api/Thoughts/:thoughtId/reactions/:reactionsId
router.route(':thoughtId/reactions/:reactionsId').delete(deleteReaction);

module.exports = router;