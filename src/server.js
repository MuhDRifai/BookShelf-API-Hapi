const Hapi = require('@hapi/hapi');
const { nanoid } = require('nanoid');

const books = [];

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });

  server.route({
    method: 'POST',
    path: '/books',
    handler: (request, h) => {
      try {
        const {
          name, year, author, summary, publisher, pageCount, readPage, reading,
        } = request.payload;

        if (!name) {
          return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
          }).code(400);
        }

        if (readPage > pageCount) {
          return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
          }).code(400);
        }

        const id = nanoid();
        const finished = pageCount === readPage;
        const insertedAt = new Date().toISOString();
        const updatedAt = insertedAt;

        const newBook = {
          id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
        };

        books.push(newBook);

        return h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        }).code(201);
      } catch (error) {
        console.error(error);
        return h.response({
          status: 'error',
          message: 'Terjadi internal server error',
        }).code(500);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/books',
    handler: (request, h) => {
      try {
        const { name, reading, finished } = request.query;

        let filteredBooks = [...books];

        if (name) {
          const lowercaseName = name.toLowerCase();
          filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(lowercaseName));
        }

        if (reading !== undefined) {
          const isReading = reading === '1';
          filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
        }

        if (finished !== undefined) {
          const isFinished = finished === '1';
          filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
        }

        const result = {
          status: 'success',
          data: {
            books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),
          },
        };

        return h.response(result).code(200);
      } catch (error) {
        console.error(error);
        return h.response({
          status: 'error',
          message: 'Terjadi internal server error',
        }).code(500);
      }
    },
  });

  server.route({
    method: 'GET',
    path: '/books/{bookId}',
    handler: (request, h) => {
      try {
        const { bookId } = request.params;
        const foundBook = books.find((book) => book.id === bookId);

        if (!foundBook) {
          return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
          }).code(404);
        }

        const result = {
          status: 'success',
          data: {
            book: foundBook,
          },
        };

        return h.response(result).code(200);
      } catch (error) {
        console.error(error);
        return h.response({
          status: 'error',
          message: 'Terjadi internal server error',
        }).code(500);
      }
    },
  });

  server.route({
    method: 'PUT',
    path: '/books/{bookId}',
    handler: (request, h) => {
      try {
        const { bookId } = request.params;
        const {
          name, year, author, summary, publisher, pageCount, readPage, reading,
        } = request.payload;

        if (!name) {
          return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
          }).code(400);
        }

        if (readPage > pageCount) {
          return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
          }).code(400);
        }

        const index = books.findIndex((book) => book.id === bookId);

        if (index === -1) {
          return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
          }).code(404);
        }

        const updatedAt = new Date().toISOString();

        books[index] = {
          ...books[index],
          name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };

        return h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        }).code(200);
      } catch (error) {
        console.error(error);
        return h.response({
          status: 'error',
          message: 'Terjadi internal server error',
        }).code(500);
      }
    },
  });

  server.route({
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: (request, h) => {
      try {
        const { bookId } = request.params;
        const index = books.findIndex((book) => book.id === bookId);

        if (index === -1) {
          return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
          }).code(404);
        }

        books.splice(index, 1);

        return h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        }).code(200);
      } catch (error) {
        console.error(error);
        return h.response({
          status: 'error',
          message: 'Terjadi internal server error',
        }).code(500);
      }
    },
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});

init();
