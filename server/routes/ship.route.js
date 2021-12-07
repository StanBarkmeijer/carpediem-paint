const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const shipCtrl = require('../controllers/ship.controller');

const router = express.Router();

module.exports = router;

// /api/ship
router.post("/", asyncHandler(shipCtrl.create));
router.get("/", asyncHandler(shipCtrl.read));
router.delete("/", asyncHandler(shipCtrl.removeAll));

// /api/ship/:id
router.get("/:id", asyncHandler(shipCtrl.read));
router.put("/:id", asyncHandler(shipCtrl.update))
router.delete("/:id", asyncHandler(shipCtrl.remove));