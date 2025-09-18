const express = require("express");
const Offer = require("../models/Offer.js");
const Lead = require("../models/Lead.js");
const  scoreRules  = require("../services/ruleScoring.js");
const  scoreAI  = require("../services/aiScoring.js");

const router = express.Router();

// Scores all leads based on the latest offer
// Combines rule-based scoring and AI scoring
// Updates each lead document with scores, intent, and reasoning
router.post("/score", async (req, res) => {
  try {
     // Fetch the latest offer from the database (sorted by _id in descending order)
    const offer = await Offer.findOne().sort({ _id: -1 }); 
    if (!offer) return res.status(400).json({ error: "No offer found" });

     // Fetch all leads from the database
    const leads = await Lead.find();

    // Loop through each lead and calculate scores
    for (let lead of leads) {

        // Get rule-based score for the lead against the offer
      const ruleScore = scoreRules(lead, offer);

       // Get AI-based score, intent, and reasoning
      const { aiScore, intent, reasoning } = await scoreAI(lead, offer);

      // Update lead with calculated scores and AI insights
      lead.ruleScore = ruleScore;
      lead.aiScore = aiScore;
      lead.finalScore = ruleScore + aiScore;
      lead.intent = intent;
      lead.reasoning = reasoning;
      await lead.save();
    }

    // Respond with success message and number of leads scored
    res.json({ message: "Scoring complete", total: leads.length });
  } catch (err) {
    res.status(500).json({ error: err.message });   // Handle errors
  }
});

router.get("/results", async (req, res) => {
  const results = await Lead.find({}, "-__v");      // Retrieve all leads, exclude __v field
  res.json(results);
});

// Exported the router to be reused
module.exports = router;