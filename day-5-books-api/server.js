import http from "http";
import { sendResponse } from "./utils.js";
import genresRouter from "./routers/genres.js";
import usersRouter from "./routers/users.js";
import seed from "./seed.js";
import authorsRouter from "./routers/authors.js";
import booksRouter from "./routers/books.js";

const PORT = process.env.PORT || 5000;

export const users = [];
export const books = [];
export const genres = [];
export const authors = [];

seed();

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET")
    return sendResponse(res, 200, { message: "API is running..." });

  if (req.url.startsWith("/genres")) return genresRouter(req, res);
  if (req.url.startsWith("/users")) return usersRouter(req, res);
  if (req.url.startsWith("/authors")) return authorsRouter(req, res);
  if (req.url.startsWith("/books")) return booksRouter(req, res);

  sendResponse(res, 404, { message: "404 Not Found" });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
