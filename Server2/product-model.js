const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Reviews = require('./review-model');

// this will be our data base's data structure 
const ProjectSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    photo:String,
    type_id: Number,
    user_id: Number
   },
  { 
  	timestamps: true,
  	toJSON: { virtuals: true }
  }
);

ProjectSchema.virtual('reviews', {
  ref: 'Review', // The model to use
  localField: 'id', 
  foreignField: 'product_id', 
  justOne: false,
});


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Product', ProjectSchema);