import { authors, books, genres } from "../server.js";
import { getBody, getNewId, sendResponse } from "../utils.js";

export default async function booksRouter(req, res) {
  // GET /books
  if (req.url === "/books" && req.method === "GET") {
    // join books with authors and genres
    const allBooks = books.map((book) => ({
      id: book.id,
      title: book.title,
      author: authors.find((author) => author.id === book.author_id),
      genre: genres.find((genre) => genre.id === book.genre_id),
    }));
    return sendResponse(res, 200, allBooks);
  }
  // GET /books/:id
  if (req.url.startsWith("/books/") && req.method === "GET") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid book ID" });

    const book = books.find((book) => book.id === parseInt(id));
    if (!book) return sendResponse(res, 404, { message: "Book not found" });

    return sendResponse(res, 200, {
      id: book.id,
      title: book.title,
      author: authors.find((author) => author.id === book.author_id),
      genre: genres.find((genre) => genre.id === book.genre_id),
    });
  }
  // POST /books
  if (req.url === "/books" && req.method === "POST") {
    try {
      const body = await getBody(req);

      if (!body || !body.title || !body.author_id || !body.genre_id)
        return sendResponse(res, 400, {
          message: "Book's title, author_id and genre_id is required.",
        });

      const authorExists = authors.find(
        (author) => author.id === parseInt(body.author_id),
      );
      if (!authorExists)
        return sendResponse(res, 400, { message: "Author does not exists" });

      const genreExists = genres.find(
        (genre) => genre.id === parseInt(body.genre_id),
      );
      if (!genreExists)
        return sendResponse(res, 400, { message: "Genre does not exists" });

      const newId = getNewId(books);
      const newBook = {
        id: newId,
        title: body.title,
        author_id: body.author_id,
        genre_id: body.genre_id,
      };
      books.push(newBook);

      return sendResponse(res, 201, newBook);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // PUT /books/:id
  if (req.url.startsWith("/books/") && req.method === "PUT") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid book ID" });

    let book = books.find((book) => book.id === parseInt(id));
    if (!book) return sendResponse(res, 404, { message: "Book not found" });

    try {
      const body = await getBody(req);
      book.title = body.title || book.title;
      book.author_id = body.author_id || book.author_id;
      book.genre_id = body.genre_id || book.genre_id;
      return sendResponse(res, 200, book);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // DELETE /books/:id
  if (req.url.startsWith("/books/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid book ID" });

    const idx = books.findIndex((book) => book.id === parseInt(id));
    if (idx !== -1) books.splice(idx, 1);

    return sendResponse(res, 204, {});
  }

  return sendResponse(res, 404, { message: "404 Not Found" });
}
