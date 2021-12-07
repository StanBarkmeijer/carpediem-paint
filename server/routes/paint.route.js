const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const paintCtrl = require('../controllers/paint.controller');

const router = express.Router();

module.exports = router;

// /api/paint
router.post("/", asyncHandler(paintCtrl.create));
router.get("/", asyncHandler(paintCtrl.read));
router.delete("/", asyncHandler(paintCtrl.removeAll));

// /api/paint/:id
router.get("/:id", asyncHandler(paintCtrl.read));
router.put("/:id", asyncHandler(paintCtrl.update))
router.delete("/:id", asyncHandler(paintCtrl.remove));