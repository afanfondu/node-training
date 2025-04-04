import { authors } from "../server.js";
import { getBody, getNewId, sendResponse } from "../utils.js";

export default async function authorsRouter(req, res) {
  // GET /authors
  if (req.url === "/authors" && req.method === "GET") {
    return sendResponse(res, 200, authors);
  }
  // GET /authors/:id
  if (req.url.startsWith("/authors/") && req.method === "GET") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid author ID" });

    const author = authors.find((author) => author.id === parseInt(id));
    if (!author) return sendResponse(res, 404, { message: "Author not found" });

    return sendResponse(res, 200, author);
  }
  // POST /authors
  if (req.url === "/authors" && req.method === "POST") {
    try {
      const body = await getBody(req);

      if (!body || !body.author)
        return sendResponse(res, 400, { message: "Author is required." });

      const newId = getNewId(authors);
      const newAuthor = { id: newId, name: body.author };
      authors.push(newAuthor);

      return sendResponse(res, 201, newAuthor);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // PUT /authors/:id
  if (req.url.startsWith("/authors/") && req.method === "PUT") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid author ID" });

    let author = authors.find((author) => author.id === parseInt(id));
    if (!author) return sendResponse(res, 404, { message: "Author not found" });

    try {
      const body = await getBody(req);
      author.name = body.author || author.name;
      return sendResponse(res, 200, author);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // DELETE /users/:id
  if (req.url.startsWith("/authors/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid author ID" });

    const idx = authors.findIndex((author) => author.id === parseInt(id));
    if (idx !== -1) authors.splice(idx, 1);

    return sendResponse(res, 204, {});
  }

  return sendResponse(res, 404, { message: "404 Not Found" });
}
