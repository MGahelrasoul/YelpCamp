const express = require("express");
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");

// Campgrounds
router.get("/", catchAsync(campgrounds.index));

// New Campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router.post("/", isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// Show Campground
router.get("/:id", catchAsync(campgrounds.showCampground));

// Edit Campground
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
router.put("/:id", isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground));

// Delete Campground
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;