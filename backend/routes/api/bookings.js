const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res, next) => {

    const { user } = req;

    if (user) {

        const bookings = await Booking.unscoped().findAll({
            where: {
                userId: user.id
            },
            include: [
                { model: Spot }
            ]
        })

        if (!bookings) {
            const err = new Error("Spot couldn't be found")
            err.status = 404;
            next(err);
        }

        const bookingsList = [];

        bookings.forEach(booking => {
            bookingsList.push(booking.toJSON())
        });

        for (let bookings of bookingsList) {

            const spotId = bookings.Spot.id

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
                    bookings.Spot.previewImage = image.url
                }
            }

            if (!bookings.Spot.previewImage) {
                bookings.Spot.previewImage = null
            }

        }

        return res.json({
            Bookings: bookingsList
        });
    }

    return res.json({
        message: "Authentication required"
    })
});


router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const id = req.params.bookingId;
    const { startDate, endDate } = req.body;

    if (user) {

        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(404).json({
                "message": "Booking couldn't be found"
            })
        }


        if (user.id === booking.userId) {

            if (startDate >= endDate) {
                return res.status(400).json({
                    "message": "Bad Request",
                    "errors": {
                        "endDate": "endDate cannot be on or before startDate"
                    }
                })
            }


            const nowDate = Date.now();
            const endDateTime = Date.parse(endDate);
            if (endDateTime <= nowDate) {
                return res.status(403).json({
                    "message": "Past bookings can't be modified"
                })
            }

            const bookings = await Booking.findAll({
                where: {
                    spotId: booking.spotId
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

            const updatedBooking = await booking.update({
                startDate: startDate,
                endDate: endDate
            })

            return res.json(updatedBooking);
        }

        return res.status(403).json({
            "message": "Forbidden"
        })
    }

    return res.json({
        message: "Authentication required"
    })

})



router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const id = req.params.bookingId;

    if (user) {

        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(404).json({
                "message": "Booking couldn't be found"
            })
        }

        if (user.id === booking.userId) {

            const nowDate = Date.now();
            const startDateTime = Date.parse(booking.startDate);

            if (startDateTime <= nowDate) {
                return res.status(403).json({
                    "message": "Bookings that have been started can't be deleted"
                })
            }

            await booking.destroy();

            return res.json({
                "message": "Successfully deleted"
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









module.exports = router;
