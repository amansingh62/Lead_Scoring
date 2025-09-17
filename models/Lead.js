//Imported required packages
const mongoose = require('mongoose');

//Defined schema for the "Lead" model
const LeadSchema = new mongoose.Schema({
    //Basic lead information
  name: String,          // Lead's full name
  role: String,          // Lead's job title or role
  company: String,       // Lead's company name
  industry: String,      // Industry of the lead's company
  location: String,      // Lead's geographical location
  linkedin_bio: String,  // Lead's LinkedIn bio / description

  //Scoring fields
  ruleScore: Number,     // Score based on rule based logic (0-50)
  aiScore: Number,       // Score based on AI layer (0-50)
  finalScore: Number,    // Added final score (rulescore + aiscore)
  intent: String,        // Buyers intent level (High / Medium / Low)
  reasoning: String,     // Explanation for the assigned intent and score
});

//Created the lead model from the schema
const Lead = mongoose.model("Lead", LeadSchema);

//Exported the model to be reused
module.exports = Lead;

