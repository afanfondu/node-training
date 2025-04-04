import http from "http";

const PORT = process.env.PORT || 3000;

let users = [{ id: Date.now().toString(), name: "John Doe" }];

// Q.4) Implement a simple middleware to log request method and URL for each incoming request.
const logger = (req) => console.log(`${req.method} ${req.url}`);

const getBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedBody = body ? JSON.parse(body) : {};
        resolve(parsedBody);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
};

const server = http.createServer(async (req, res) => {
  logger(req);

  res.setHeader("Content-Type", "application/json");

  // Q.1) Write a simple Node.js server using the http module that responds with "Hello, World!".
  if (req.url === "/" && req.method === "GET") {
    return res.writeHead(200).end(JSON.stringify({ message: "Hello, World!" }));
  }

  // Q.2) Create a RESTful API with endpoints to GET all users, POST a new user, and DELETE a user.
  // GET /users - get all users
  if (req.url === "/users" && req.method === "GET") {
    return res.writeHead(200).end(JSON.stringify(users));
  }
  // POST /users - add a new user
  if (req.url === "/users" && req.method === "POST") {
    try {
      const body = await getBody(req);

      // Q.3) Simulate error handling by returning appropriate HTTP status codes and messages in your REST API.
      if (!body || !body.name)
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "Name is required." }));

      const newUser = { id: Date.now().toString(), name: body.name };
      users.push(newUser);

      return res.writeHead(201).end(JSON.stringify(newUser));
    } catch (error) {
      return res
        .writeHead(500)
        .end({ message: "Something went wrong!", details: error });
    }
  }
  // DELETE /users/:id - delete a user
  if (req.url.startsWith("/users/") && req.method === "DELETE") {
    const userId = req.url.split("/")[2];

    // Q.3)
    if (!userId)
      return res
        .writeHead(400)
        .end(JSON.stringify({ message: "User ID is required." }));

    users = users.filter((user) => user.id !== userId);
    return res.writeHead(204).end();
  }

  res
    .writeHead(404)
    .end(JSON.stringify({ message: `Not Found - ${req.method} ${req.url}` }));
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
