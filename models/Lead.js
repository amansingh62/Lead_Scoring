const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  industry: String,
  location: String,
  linkedin_bio: String,

  ruleScore: Number,
  aiScore: Number,
  finalScore: Number,
  intent: String,
  reasoning: String,

})