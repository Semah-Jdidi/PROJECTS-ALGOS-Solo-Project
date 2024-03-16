const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Title is Required!"],
    minLength: [2, "Title Must Be At Least 2 Characters!"]
  },

  description: {
    type: String,
    required: [true, "Description is Required!"],
    minLength: [2, "Book Description Must Be At Least 5 Characters!"]
  },
  createdBy: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
},{timestamps: true});

module.exports = mongoose.model('Book', BookSchema);