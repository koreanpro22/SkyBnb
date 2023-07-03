const express = require('express');
const { Op } = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Booking, Review, Reviewimage, Spotimage } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const { user } = req;
    const id = req.params.imageId;

    if (user) {
        
        const image = await Spotimage.findByPk(id, {
            include: [{ model: Spot }]
        });

        if (!image) {
            return res.status(404).json({
                "message": "Spot Image couldn't be found"
            })
        }

        if (user.id === image.Spot.ownerId) {

            await image.destroy();

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
