import http from "http";

const req = http.request(
  {
    hostname: "jsonplaceholder.typicode.com",
    path: "/posts/1",
    method: "GET",
  },
  (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk.toString()));

    res.on("end", () => console.log("Response: ", data));
  },
);

req.on("error", (err) => {
  console.error("Error:", err.message);
});

req.end();
