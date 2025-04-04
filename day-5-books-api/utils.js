export const getBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        body = body ? JSON.parse(body) : {};
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", (error) => reject(error));
  });
};

export const sendResponse = (res, statusCode, data) => {
  res
    .writeHead(statusCode, {
      "Content-Type": "application/json",
    })
    .end(JSON.stringify(data));
};

export const getNewId = (array) => {
  return array.length ? Math.max(...array.map((item) => item.id)) + 1 : 1;
};
