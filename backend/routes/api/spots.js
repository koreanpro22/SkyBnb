const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 }, { max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
]

//Get All Spots
router.get('/', async (req, res, next) => {

    const { page, size } = req.query;
    let limit;
    let offset;
    let pageNum;
    const errors = {};

    if (!page) {
        pageNum = 1
    } else if (page < 1 || page > 10) {
        errors.page = "Page must be greater than or equal to 1"
    } else {
        pageNum = page
    }

    if (!size) {
        limit = 20
    } else if (size < 1 || size > 20) {
        errors.size = "Size must be greater than or equal to 1"
    } else {
        limit = size
        offset = limit * (pageNum - 1);
    }

    if (Object.keys(errors).length) {
        res.status(400).json({
            message: "Bad Request",
            errors: errors
        })
    }



    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: Spotimage }
        ],
        limit: limit,
        offset: offset,
    });

    let spotsList = [];
    spots.forEach(spot => spotsList.push(spot.toJSON()))

    spotsList.forEach(spot => {
        let length = spot.Reviews.length;
        let totalStars = 0;

        spot.Reviews.forEach(review => totalStars += review.stars)

        !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars / length).toFixed(1)

        spot.Spotimages.forEach(image => {
            if (image.preview) {
                spot.previewImage = image.url

            }
        })
        if (!spot.previewImage) {
            spot.previewImage = null
        }

        delete spot.Reviews;
        delete spot.Spotimages;
    })

    return res.json({
        Spots: spotsList,
        page: pageNum,
        size: limit
    });
});

//Get Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {
        const spots = await Spot.unscoped().findAll({
            where: {
                ownerId: user.id
            },
            include: [
                { model: Review },
                { model: Spotimage }
            ]
        });

        if (!spots) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        }

        let spotsList = []

        spots.forEach(spot => {
            spotsList.push(spot.toJSON())
        })

        spotsList.forEach(spot => {
            let length = spot.Reviews.length;
            let totalStars = 0;

            spot.Reviews.forEach(review => totalStars += review.stars)

            !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars / length).toFixed(1)

            spot.Spotimages.forEach(image => {
                if (image.preview) {
                    spot.previewImage = image.url
                }
            })

            if (!spot.previewImage) {
                spot.previewImage = null
            }

            delete spot.Reviews;
            delete spot.Spotimages;
        })

        return res.json({
            Spots: spotsList
        });
    }

    return res.json({
        message: "Authentication required"
    })
});

//Get details of a spot from an id
router.get('/:spotId', async (req, res, next) => {

    const id = req.params.spotId;
    const spots = await Spot.unscoped().findByPk(id, {
        include: [
            { model: Review },
            { model: Spotimage },
            {
                model: User,
                attributes: [
                    'id',
                    'firstName',
                    'lastName'
                ]
            }
        ]
    });

    if (!spots) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err);
    }

    let spot = spots.toJSON();


    let length = spot.Reviews.length;
    let totalStars = 0;

    spot.Reviews.forEach(review => totalStars += review.stars)

    !totalStars ? spot.avgRating = 'There is no rating at the moment' : spot.avgRating = (totalStars / length).toFixed(1)

    spot.Owner = spot.User

    delete spot.Reviews
    delete spot.User
    // console.log('routes spot ', spot.Spotimages);

    return res.json(spot);
})


//Create a Spot
router.post('/', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {


        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const err = {
            message: "Bad Request",
            errors: {

            }
        }

        if (!address) {
            err.errors.address = "Street address is required"
        }
        if (!city) {
            err.errors.city = "City is required"
        }
        if (!state) {
            err.errors.state = "State is required"
        }
        if (!country) {
            err.errors.country = "Country is required"
        }
        if (!lat) {
            err.errors.lat = "Latitude is not valid"
        }
        if (!lng) {
            err.errors.lng = "Longitude is not valid"
        }
        if (!name) {
            err.errors.name = "Name must be less than 50 characters"
        }
        if (!description) {
            err.errors.description = "Description is required"
        }
        if (!price) {
            err.errors.price = "Price per day is required"
        }

        if (Object.keys(err.errors).length) {
            return res.status(400).json(err);
        }

        const spot = await Spot.create({
            ownerId: user.dataValues.id,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            name: name,
            description: description,
            price: price
        });

        return res.status(201).json(spot);

    }

    return res.json({
        message: "Authentication required"
    })
})

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    const id = req.params.spotId;
    const { url, preview } = req.body;
    const { user } = req;

    if (user) {

        const spot = await Spot.findByPk(id);

        if (!spot) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.dataValues.id === spot.dataValues.ownerId) {

            const newImage = await spot.createSpotimage({
                url: url,
                preview: preview
            })

            return res.json({
                id: newImage.id,
                url: newImage.url,
                preview: newImage.preview
            });
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })
});

//Edit a Spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const { user } = req
    const id = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    if (user) {

        const spot = await Spot.unscoped().findByPk(id);

        if (!spot) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.dataValues.id === spot.dataValues.ownerId) {

            const err = {
                message: "Bad Request",
                errors: {}
            }

            if (!address) {
                err.errors.address = "Street address is required"
            }
            if (!city) {
                err.errors.city = "City is required"
            }
            if (!state) {
                err.errors.state = "State is required"
            }
            if (!country) {
                err.errors.country = "Country is required"
            }
            if (!lat || lat > 90 || lat < -90) {
                err.errors.lat = "Latitude is not valid"
            }
            if (!lng || lng > 180 || lng < -180) {
                err.errors.lng = "Longitude is not valid"
            }
            if (!name || name.length >= 50) {
                err.errors.name = "Name must be less than 50 characters"
            }
            if (!description) {
                err.errors.description = "Description is required"
            }
            if (!price) {
                err.errors.price = "Price per day is required"
            }

            if (Object.keys(err.errors).length) {
                return res.status(400).json(err);
            }

            await spot.update({
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price
            })

            await spot.save();

            return res.json(spot);
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }
    return res.json({
        message: "Authentication required"
    })
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const id = req.params.spotId;

    const spot = await Spot.findByPk(id);

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404;
        next(err);
    }

    await spot.destroy();

    return res.json({
        "message": "Successfully deleted"
    });
});

//refactor later
//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {

    const { user } = req
    const id = req.params.spotId;

    const spot = await Spot.findByPk(id, {
        include: [
            { model: User },
            {
                model: Review,
                attributes: {
                    exclude: []
                },
                include: [
                    { model: User }
                ]
            }
        ]
    })

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
          })
    }



    const spotObj = spot.toJSON();

    let reviews = spotObj.Reviews;


    let reviewsList = [];



    for (let review of reviews) {

        let id = review.id;

        const reviewImages = await Reviewimage.findAll({
            attributes: ['id', 'url'],
            where: {
                reviewId: id
            }
        });

        const reviewimagelist = [];
        reviewImages.forEach(reviewimg => {
            let reviewimgobj = reviewimg.toJSON();
            reviewimagelist.push(reviewimgobj);
        })

        review.ReviewImages = reviewimagelist;

        reviewsList.push(review);


    }

    res.json({ Reviews: reviewsList });
})

const validateCreateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {

        const { review, stars } = req.body
        const id = req.params.spotId;

        const spot = await Spot.findByPk(id, {
            include: [
                { model: Review }
            ]
        });

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            })
        }

        const errors = {}

        if (!review) {
            errors.review = "Review text is required"
        }

        if (!stars || stars < 1 || stars > 5) {
            errors.stars = "Stars must be an integer from 1 to 5"
        }

        if (Object.keys(errors).length) {
            return res.status(400).json({
                message: "Bad Request",
                errors: errors
            })
        }

        const reviews = spot.dataValues.Reviews

        for (let review of reviews) {
            console.log(review)
            console.log(user);
            if (review.dataValues.userId === user.dataValues.id) {
                return res.status(403).json({
                    message: "User already has a review for this spot"
                })
            }
        }

        const newReview = await spot.createReview({
            spotId: spot.dataValues.id,
            userId: user.dataValues.id,
            review: review,
            stars: stars
        })

        return res.json(newReview);
    }

    return res.json({
        message: "Authentication required"
    })

})

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const { user } = req;
    const id = req.params.spotId;

    if (user) {

        const spot = await Spot.findByPk(id);

        if (!spot) {
            res.status(404).json({
                "message": "Spot couldn't be found"
              })
        };

        const bookings = await Booking.unscoped().findAll({
            include: [{
                attributes: ['id', 'firstName', 'lastName'],
                model: User
            }],
            where: {
                spotId: id
            }
        })

        const bookingsList = [];

        for (booking of bookings) {
            bookingsList.push(booking.toJSON())
        }

        for (booking of bookingsList) {
            if (booking.userId !== user.id) {
                delete booking.id
                delete booking.User
                delete booking.userId
                delete booking.createdAt
                delete booking.updatedAt
            }
        }

        return res.json({
            Bookings: bookingsList
        })
    }

    return res.json({
        message: "Authentication required"
    })

})

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const { user } = req;
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;

    if (user) {

        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({
                "message": "Spot couldn't be found"
            })
        }

        if (spot.ownerId === user.id) {
            return res.status(404).json({
                message: "Spot must NOT belong to the current user"
            })
        }

        if (startDate >= endDate) {
            return res.status(400).json({
                "message": "endDate cannot be on or before startDate"
            })
        }


        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            }
        });

        const bookingsList = [];

        for (bookingJson of bookings) {
            bookingsList.push(bookingJson.toJSON())
        }

        let userStart = Date.parse(startDate);
        let userEnd = Date.parse(endDate);

        for (bookingObj of bookingsList) {

            const err = {
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {}
            }


            let bookingStart = Date.parse(bookingObj.startDate);
            let bookingEnd = Date.parse(bookingObj.endDate);

            if (userStart >= bookingStart && userStart <= bookingEnd) {
                err.errors.startDate = "Start date conflicts with an existing booking"
            }

            if (userEnd >= bookingStart && userEnd <= bookingEnd) {
                err.errors.endDate = "End date conflicts with an existing booking"
            }

            if (Object.keys(err.errors).length > 0) {
                return res.status(403).json(err);
            }
        }

        const newBooking = await Booking.create({
            spotId: spotId,
            userId: user.id,
            startDate: startDate,
            endDate: endDate
        })

        const booking = await Booking.unscoped().findByPk(newBooking.id);

        return res.json(booking)
    }

    return res.json({
        message: "Authentication required"
    })

})



module.exports = router;
