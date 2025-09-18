// Imported required packages
const express = require('express');        
const multer = require('multer');          
const parseCSV = require('../utils/csvParser'); 
const Lead = require('../models/Lead');    

// Initialize Express Router
const router = express.Router();

// Configure Multer to store uploaded files in the "uploads/" directory
const upload = multer({ dest: "uploads/" });

// Route: Upload leads via CSV file
// Endpoint: POST /leads/upload
// Purpose: Accepts a CSV file, parses it, and saves the data into MongoDB
router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        // Parse the uploaded CSV file using our custom parser
        const leads = await parseCSV(req.file.path);

        // Insert all parsed leads into the MongoDB database
        await Lead.insertMany(leads);

        // Send success response with how many leads were uploaded
        res.json({ message: "Leads uploaded successfully", count: leads.length });
    } 
    catch (error) {
        // Handle errors and return error response
        res.status(500).json({ error: error.message });
    }
});

// Exported the router to be reused
module.exports = router;
