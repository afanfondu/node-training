// models/comment.js
class Comment {
  static idCounter = 1;
  constructor(commenter, text) {
    this.id = Comment.idCounter++;
    this.commenter = commenter;
    this.text = text;
  }
}

// models/post.js
class Post {
  static idCounter = 1;

  constructor(content, author) {
    this.id = Post.idCounter++;
    this.content = content;
    this.author = author;
    this.likes = [];
    this.comments = [];
    this.createdAt = new Date();
  }

  like(user) {
    const alreadyLiked = this.likes.some((like) => like.id === user.id);
    if (alreadyLiked) return console.error("You have already liked this post.");
    if (user.id === this.author.id)
      return console.error("You cannot like your own post.");
    this.likes.push(user);
  }

  addComment(user, text) {
    if (user.id === this.author.id)
      return console.error("You cannot comment on your own post.");
    const comment = new Comment(user, text);
    this.comments.push(comment);
  }
}

// models/user.js
class User {
  static idCounter = 1;

  constructor(username) {
    this.id = User.idCounter++;
    this.username = username;
    this.posts = [];
  }

  createPost(content) {
    const post = new Post(content, this);
    this.posts.push(post);
    return post;
  }
}

// utils.js
export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

let userId = 1;
export const generateUsername = () => `user_${userId++}`;

export const generateContent = () => {
  const sentences = [
    "Hello world!",
    "Having a great day!",
    "Node.js is awesome!",
    "Just posted something cool!",
    "Life is beautiful!",
    "Chilling...",
    "Writing some code!",
    "Exploring JavaScript!",
    "Learning OOP!",
    "Posting random stuff!",
  ];
  return getRandomElement(sentences);
};

export const generateComment = () => {
  const comments = [
    "Nice post!",
    "Agreed!",
    "Interesting!",
    "Well said!",
    "Love this!",
    "So true!",
    "Hahaha",
    "Cool!",
    "Good one!",
    "Wow!",
  ];
  return getRandomElement(comments);
};

// main.js
const users = Array.from({ length: 10 }, () => new User(generateUsername()));
const posts = users.map((user) => user.createPost(generateContent()));

// Interactions simulation (likes and comments)
for (let i = 0; i < 20; i++) {
  const user = getRandomElement(users);
  const post = getRandomElement(posts);

  if (user.id !== post.author.id) {
    post.like(user);
    post.addComment(user, generateComment());
  }
}

console.log("All posts: \n");

users.forEach((user) => {
  console.log(`👤 User: ${user.username} (ID: ${user.id})`);
  user.posts.forEach((post) => {
    console.log(
      `  📝 Post #${post.id} (${post.createdAt.toLocaleString()}): ${post.content}`,
    );
    console.log(
      `    👍 Likes (${post.likes.length}): ${post.likes.map((u) => u.username).join(", ") || "None"}`,
    );
    console.log(`    💬 Comments (${post.comments.length}):`);
    post.comments.forEach((c) => {
      console.log(`      - ${c.commenter.username}: ${c.text}`);
    });
    console.log("\n");
  });
});
