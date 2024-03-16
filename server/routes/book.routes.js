const bookController = require('../controllers/book.controller');
const authenticateUser = require('../middlewares/authenticateUser');
const express = require('express');
const router = express.Router();

module.exports = router => {
  router.use(authenticateUser)
  router.get('/api/books', bookController.findBooks);
  router.get('/api/books/:id', bookController.findOneBook);
  router.post('/api/books/create', bookController.createBook);
  router.post('/api/books/edit/:id', bookController.updateBook);
  router.delete('/api/books/delete/:id', bookController.deleteBook);
};