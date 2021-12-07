const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const paintRoutes = require('./paint.route');
const orderRoutes = require('./order.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/paint', paintRoutes);
router.use('/order', orderRoutes)

module.exports = router;