/* eslint-disable max-len */
const { nanoid } = require('nanoid');

const Constant = require('../../handler/constant');
const { defaultResponse } = require('../../pkg/helper/common');
const { books } = require('./model');

const C = new Constant();

class BookRepository {
  static addBook(data) {
    const { pageCount, readPage } = data;

    // add data
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
      id,
      ...data,
      finished,
      insertedAt,
      updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((m) => m.id === id).length > 0;

    if (isSuccess) {
      const resp = defaultResponse({
        status: C.statusSuccess,
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });

      return {
        code: 201,
        resp,
      };
    }

    const resp = defaultResponse({
      status: C.statusError,
      message: 'Buku gagal ditambahkan"',
    });

    return {
      code: 500,
      resp,
    };
  }

  static getAllBooks(query) {
    const { name, reading, finished } = query;
    let filteredBook = [...books];

    if (name !== undefined && name.trim().length > 0) {
      filteredBook = filteredBook.filter((book) =>
        book.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    const numReading = Number.parseInt(reading, 10);
    if (!Number.isNaN(numReading)) {
      filteredBook = filteredBook.filter(
        (book) => book.reading === !!numReading
      );
    }

    const numFinished = Number.parseInt(finished, 10);
    if (!Number.isNaN(numFinished)) {
      filteredBook = filteredBook.filter(
        (book) => book.finished === !!numFinished
      );
    }

    const resp = defaultResponse({
      status: C.statusSuccess,
      data: {
        books: filteredBook.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });

    return {
      code: 200,
      resp,
    };
  }

  static getBookById(id) {
    const bookData = books.filter((b) => b.id === id)[0];

    if (bookData) {
      const resp = defaultResponse({
        status: C.statusSuccess,
        data: {
          book: bookData,
        },
      });

      return { code: 200, resp };
    }

    const resp = defaultResponse({
      status: C.statusFail,
      message: 'Buku tidak ditemukan',
    });

    return { code: 404, resp };
  }

  static updateBookById(id, newBookData) {
    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
      const updatedAt = new Date().toISOString();

      let readingStatus = false;
      if (typeof newBookData.reading === 'boolean') {
        readingStatus = newBookData.reading;
      } else {
        readingStatus = index.reading;
      }

      const data = {
        name: newBookData.name || index.name,
        year: newBookData.year || index.year,
        author: newBookData.author || index.author,
        summary: newBookData.summary || index.summary,
        publisher: newBookData.publisher || index.publisher,
        pageCount: newBookData.pageCount || index.pageCount,
        readPage: newBookData.readPage || index.readPage,
        reading: readingStatus,
        updatedAt,
      };

      books[index] = {
        ...books[index],
        ...data,
      };

      const resp = defaultResponse({
        status: C.statusSuccess,
        message: 'Buku berhasil diperbarui',
      });

      return { code: 200, resp };
    }

    const resp = defaultResponse({
      status: C.statusFail,
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });

    return { code: 404, resp };
  }

  static deleteBookById(id) {
    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
      books.splice(index, 1);

      const resp = defaultResponse({
        status: C.statusSuccess,
        message: 'Buku berhasil dihapus',
      });

      return { code: 200, resp };
    }

    const resp = defaultResponse({
      status: C.statusFail,
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    return { code: 404, resp };
  }
}

module.exports = BookRepository;
