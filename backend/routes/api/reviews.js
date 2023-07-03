const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const checkingReview = [

]


//Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {

        const reviews = await Review.unscoped().findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spot,
                    attributes: {
                        exclude: ['description', 'createdAt', 'updatedAt']
                    }
                },
                {
                    model: Reviewimage,
                    attributes: ['id', 'url']
                }
            ]
        });

        const reviewsList = []

        reviews.forEach(review => {
            reviewsList.push(review.toJSON());
        });


        for (let reviews of reviewsList) {

            const spotId = reviews.Spot.id

            const images = await Spotimage.findAll({
                where: {
                    spotId: spotId
                }
            });

            const imagesList = []

            images.forEach(image => {
                imagesList.push(image.toJSON())
            })

            for (image of imagesList) {
                if (image.preview) {
                    reviews.Spot.previewImage = image.url
                }
            }

            if (!reviews.Spot.previewImage) {
                reviews.Spot.previewImage = null
            }

        }

        return res.json({
            Reviews: reviewsList
        });
    }

    return res.json({
        message: "Authentication required"
    })
})


//Add an Image to a Review based on the Review's Id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    const id = req.params.reviewId;
    const { user } = req;

    if (user) {

        const reviewObj = await Review.findByPk(id);

        if (!reviewObj) {
            const err = new Error("Review couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.id === reviewObj.userId) {

            const { url } = req.body;

            const image = await reviewObj.createReviewimage({
                url: url
            })

            return res.json({
                id: image.dataValues.id,
                url: image.dataValues.url
            })
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })
})


//Edit a Review
router.put('/:reviewId', requireAuth, async (req, res, next) => {

    const id = req.params.reviewId;
    const { user } = req;

    if (user) {

        const reviewObj = await Review.unscoped().findByPk(id);

        if (!reviewObj) {
            const err = new Error("Review couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.id === reviewObj.userId) {

            const { review, stars } = req.body;

            const err = {
                message: "Bad Request",
                errors: {}
            };


            if (!review) {
                err.errors.review = "Review text is required"
            }

            if (!stars || stars > 5 || stars < 1) {
                err.errors.stars = "Stars must be an integer from 1 to 5"
            }

            if (Object.keys(err.errors).length) {
                return res.status(400).json(err);
            }

            await reviewObj.update({
                review: review,
                stars: stars
            })

            return res.json(reviewObj);
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })

})


//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const id = req.params.reviewId;
    const { user } = req;

    if (user) {

        const reviewObj = await Review.unscoped().findByPk(id);
        console.log(reviewObj)

        if (!reviewObj) {
            const err = new Error("Review couldn't be found")
            err.status = 404;
            next(err);
        }

        if (user.id === reviewObj.userId) {

            await reviewObj.destroy();

            return res.json({
                "message": "Successfully deleted"
            });
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })

})



module.exports = router;
