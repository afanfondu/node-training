import { users, books, genres, authors } from "./server.js";

export default function seed() {
  genres.push({ id: 1, name: "Science Fiction" });
  genres.push({ id: 2, name: "Mystery" });
  genres.push({ id: 3, name: "Fantasy" });

  authors.push({ id: 1, name: "Isaac Asimov" });
  authors.push({ id: 2, name: "Agatha Christie" });
  authors.push({ id: 3, name: "J.K. Rowling" });

  books.push({ id: 1, title: "Foundation", author_id: 1, genre_id: 1 });
  books.push({
    id: 2,
    title: "Murder on the Orient Express",
    author_id: 2,
    genre_id: 2,
  });
  books.push({ id: 3, title: "Harry Potter", author_id: 3, genre_id: 3 });

  users.push({ id: 1, name: "John Doe", email: "john@example.com" });
  users.push({ id: 2, name: "Jane Smith", email: "jane@example.com" });
}
