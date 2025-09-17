//Imported required packages
const mongoose = require('mongoose');

//Defined schema for the "Offer" model
const offerSchema = new mongoose.Schema({
    //Name of the product/offer
   name: {
    type: String, 
    required: true
   },

   //Key value proposition of the offer
   value_props: {
    type: [String],
  },

  //Ideal use cases for the offer
  ideal_use_cases: {
    type: [String],
  },
});

//Created the offer model from the schema
const Offer = mongoose.model("Offer", offerSchema);

//Exported the model to be reused
module.exports = Offer;
