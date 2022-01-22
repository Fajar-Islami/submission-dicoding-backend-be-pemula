const BookUseCase = require('../pkg/usecase/book_usecase');

class BookHandler {
  static insertNewBook(req, h) {
    const data = {
      name: req.payload.name || '',
      year: req.payload.year || 0,
      author: req.payload.author || '',
      summary: req.payload.summary || '',
      publisher: req.payload.publisher || '',
      pageCount: req.payload.pageCount || 0,
      readPage: req.payload.readPage || 0,
      reading: req.payload.reading || false,
    };

    const { code, resp } = BookUseCase.insertBook(data);

    const response = h.response(resp);
    response.code(code);

    return response;
  }

  static getAllBook(req, h) {
    const { code, resp } = BookUseCase.getAllBook(req.query);

    const response = h.response(resp);
    response.code(code);

    return response;
  }

  static getBookById(req, h) {
    const { bookId } = req.params;
    const { code, resp } = BookUseCase.getBooyById(bookId);

    const response = h.response(resp);
    response.code(code);

    return response;
  }

  static updateBookById(req, h) {
    const { bookId } = req.params;
    const { code, resp } = BookUseCase.updateBookById(bookId, req.payload);

    const response = h.response(resp);
    response.code(code);

    return response;
  }

  static deleteBookById(req, h) {
    const { bookId } = req.params;
    const { code, resp } = BookUseCase.deleteBook(bookId);

    const response = h.response(resp);
    response.code(code);

    return response;
  }
}

module.exports = BookHandler;
