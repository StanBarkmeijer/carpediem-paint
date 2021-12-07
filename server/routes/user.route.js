const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

// /api/user
router.post("/", asyncHandler(userCtrl.create));
router.get("/", asyncHandler(userCtrl.read));
router.delete("/", asyncHandler(userCtrl.removeAll));

// /api/user/:id
router.get("/:id", asyncHandler(userCtrl.read));
router.put("/:id", asyncHandler(userCtrl.update))
router.delete("/:id", asyncHandler(userCtrl.remove));