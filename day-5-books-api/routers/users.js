import { users } from "../server.js";
import { getBody, getNewId, sendResponse } from "../utils.js";

export default async function usersRouter(req, res) {
  // GET /users
  if (req.url === "/users" && req.method === "GET") {
    return sendResponse(res, 200, users);
  }
  // GET /users/:id
  if (req.url.startsWith("/users/") && req.method === "GET") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid user ID" });

    const user = users.find((user) => user.id === parseInt(id));
    if (!user) return sendResponse(res, 404, { message: "User not found" });

    return sendResponse(res, 200, user);
  }
  // POST /users
  if (req.url === "/users" && req.method === "POST") {
    try {
      const body = await getBody(req);

      if (!body || !body.name || !body.email)
        return sendResponse(res, 400, {
          message: "User's name and email is required.",
        });

      const userExists = users.find((user) => user.email === body.email);
      if (userExists)
        return sendResponse(res, 400, { message: "User already exists" });

      const newId = getNewId(users);
      const newUser = { id: newId, name: body.name, email: body.email };
      users.push(newUser);

      return sendResponse(res, 201, newUser);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // PUT /users/:id
  if (req.url.startsWith("/users/") && req.method === "PUT") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid user ID" });

    let user = users.find((user) => user.id === parseInt(id));
    if (!user) return sendResponse(res, 404, { message: "User not found" });

    try {
      const body = await getBody(req);
      user.name = body.name || user.name;
      user.email = body.email || user.email;
      return sendResponse(res, 200, user);
    } catch (error) {
      return sendResponse(res, 500, {
        message: "Something went wrong!",
        error,
      });
    }
  }
  // DELETE /users/:id
  if (req.url.startsWith("/users/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];

    if (!id || isNaN(id))
      return sendResponse(res, 400, { message: "Invalid user ID" });

    const idx = users.findIndex((user) => user.id === parseInt(id));
    if (idx !== -1) users.splice(idx, 1);

    return sendResponse(res, 204, {});
  }

  return sendResponse(res, 404, { message: "404 Not Found" });
}
