const BookHandler = require('./book_handler');
const Constant = require('./constant');

const C = new Constant();

class Routes {
  static routes = [
    {
      method: C.POST,
      path: '/books',
      handler: BookHandler.insertNewBook,
    },
    {
      method: C.GET,
      path: '/books',
      handler: BookHandler.getAllBook,
    },
    {
      method: C.GET,
      path: '/books/{bookId}',
      handler: BookHandler.getBookById,
    },
    {
      method: C.PUT,
      path: '/books/{bookId}',
      handler: BookHandler.updateBookById,
    },
    {
      method: C.DELETE,
      path: '/books/{bookId}',
      handler: BookHandler.deleteBookById,
    },
  ];
}

module.exports = Routes;
