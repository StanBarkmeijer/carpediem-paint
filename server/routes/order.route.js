const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const orderCtrl = require('../controllers/order.controller');

const router = express.Router();

module.exports = router;

// /api/order
router.post("/", asyncHandler(orderCtrl.create));
router.get("/", asyncHandler(orderCtrl.read));
router.delete("/", asyncHandler(orderCtrl.removeAll));

// /api/order/:id
router.get("/:id", asyncHandler(orderCtrl.read));
router.put("/:id", asyncHandler(orderCtrl.update))
router.delete("/:id", asyncHandler(orderCtrl.remove));