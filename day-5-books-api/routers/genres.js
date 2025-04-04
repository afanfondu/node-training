import { genres } from "../server.js";
import { getBody, getNewId, sendResponse } from "../utils.js";

export default async function genresRouter(req, res) {
  // GET /genres
  if (req.url === "/genres" && req.method === "GET") {
    return sendResponse(res, 200, genres);
  }
  // GET /genres/:id
  if (req.url.startsWith("/genres/") && req.method === "GET") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid genre ID" });

    const genre = genres.find((genre) => genre.id === parseInt(id));
    if (!genre) return sendResponse(res, 404, { message: "Genre not found" });

    return sendResponse(res, 200, genre);
  }
  // POST /genres
  if (req.url === "/genres" && req.method === "POST") {
    try {
      const body = await getBody(req);

      if (!body || !body.genre)
        return sendResponse(res, 400, { message: "Genre is required." });

      const newId = getNewId(genres);
      const newGenre = { id: newId, name: body.genre };
      genres.push(newGenre);

      return sendResponse(res, 201, newGenre);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // PUT /genres/:id
  if (req.url.startsWith("/genres/") && req.method === "PUT") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid genre ID" });

    let genre = genres.find((genre) => genre.id === parseInt(id));
    if (!genre) return sendResponse(res, 404, { message: "Genre not found" });

    try {
      const body = await getBody(req);
      genre.name = body.genre || genre.name;
      return sendResponse(res, 200, genre);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // DELETE /genres/:id
  if (req.url.startsWith("/genres/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid genre ID" });

    const idx = genres.findIndex((genre) => genre.id === parseInt(id));
    if (idx !== -1) genres.splice(idx, 1);

    return sendResponse(res, 204, {});
  }

  return sendResponse(res, 404, { message: "404 Not Found" });
}
