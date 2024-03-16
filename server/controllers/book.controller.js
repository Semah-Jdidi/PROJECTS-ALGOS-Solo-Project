const Book = require('../models/book.model');

module.exports = {
  createBook: async (req, res) => {
    try {
      const { title, description } = req.body;
      const createdBy = req.user.firstName
      const userId = req.user._id
      const newBook = await Book.create({title, description, createdBy, userId});
      res.status(201).json(newBook);
    } 
    catch (error) {
      res.status(400).json(error);
    }
  },

  updateBook: (req, res) => {
    Book.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
      .then(updatedBook => res.status(201).json(updatedBook))
      .catch(err => res.status(400).json(err))
  },

  findBooks: (req, res) => {
    Book.find()
      .then(books => res.json(books))
      .catch(err => res.json(err))
  },

  findOneBook : (req, res) => {
    Book.findOne({_id: req.params.id})
      .then(book => res.json(book))
      .catch(err => res.json(err))
  },

  deleteBook : (req, res) => {
    Book.deleteOne({_id: req.params.id})
      .then(result => res.json(result))
      .catch(err => res.json(err))
  }
};

