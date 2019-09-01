const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const IdeaSchema = new Schema(
  {
    id: Number,
    name: String,
    description: String,
    photo:String,
    description:String,
    // type_id: Number,
    user_id: Number

  },
  { timestamps: true }
);


// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Idea', IdeaSchema);