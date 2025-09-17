// Imported required packages
const express = require('express');
const Offer = require('../models/Offer');

// Initialized the express router
const router = express.Router();

// Routes for creating new offer
router.post("/", async (req, res) => {
    try {
        // Create a new offer using request body data
        const offer = new Offer(req.body);
        await offer.save();             // save the offer to mongodb
        res.status(201).json(offer);    // respond with newly created offer
    } 
    
    catch (error) {
        // If saving fails then return status 400 with error message
        res.status(400).json({ error: error.message }); 
    }
});

// Exported the router to be reused
module.exports = router;