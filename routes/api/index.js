const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// adds user/thought path to end route
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;