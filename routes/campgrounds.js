const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
// const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    .post(upload.single('image'), (req, res) => {
        // res.send(req.body, req.file)
        // res.send('Uploaded!');
        console.log(req.body, req.file);
        res.redirect('/campgrounds');
    });


router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(validateCampground, isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router