const { defaultResponse } = require('../helper/common');
const Constant = require('../../handler/constant');

const BookRepository = require('../../domain/book/book_repository');

const C = new Constant();

class BookUcS {
  static insertBook(data) {
    const { name, pageCount, readPage } = data;

    if (name === '') {
      const resp = defaultResponse({
        status: C.statusFail,
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });

      return {
        code: 400,
        resp,
      };
    }

    if (readPage > pageCount) {
      const resp = defaultResponse({
        status: C.statusFail,
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });

      return {
        code: 400,
        resp,
      };
    }

    return BookRepository.addBook(data);
  }

  static getAllBook(query) {
    return BookRepository.getAllBooks(query);
  }

  static getBooyById(bookId) {
    return BookRepository.getBookById(bookId);
  }

  static updateBookById(bookId, newBookData) {
    if (!newBookData.name) {
      const resp = defaultResponse({
        status: C.statusFail,
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });

      return {
        code: 400,
        resp,
      };
    }

    if (newBookData.readPage > newBookData.pageCount) {
      const resp = defaultResponse({
        status: C.statusFail,
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });

      return {
        code: 400,
        resp,
      };
    }

    return BookRepository.updateBookById(bookId, newBookData);
  }

  static deleteBook(bookId) {
    return BookRepository.deleteBookById(bookId);
  }
}

module.exports = BookUcS;
