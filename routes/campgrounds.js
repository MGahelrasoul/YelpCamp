const express = require("express");
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const {storage} = require("../cloudinary");
const upload = multer ({ storage });

// Campgrounds
router.get("/", catchAsync(campgrounds.index));

// New Campground
router.get("/new", isLoggedIn, campgrounds.renderNewForm);
router.post("/", isLoggedIn, upload.array("image"), validateCampground, catchAsync(campgrounds.createCampground));


// Show Campground
router.get("/:id", catchAsync(campgrounds.showCampground));

// Edit Campground
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
router.put("/:id", isLoggedIn, isAuthor, upload.array("image"), validateCampground, catchAsync(campgrounds.editCampground));

// Delete Campground
router.delete("/:id", isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;