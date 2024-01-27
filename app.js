const express = require("express");
const { connectToDb, getDb } = require("./db");

const port = 3002;

const app = express();

app.use(express.json());

const cors = require("cors");

// Database Connection
let db;
connectToDb((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log("listening on", port);
    });
    db = getDb();
  }
});

app.use(cors({ origin: "http://localhost:3000" }));

// Routes
app.get("/users", (req, res) => {
  let books = [];
  db.collection("users")
    .find()
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "cannot fetch" });
    });
});

app.get("/posts", (req, res) => {
  let books = [];
  db.collection("posts")
    .find()
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "cannot fetch" });
    });
});

app.get("/login/:email", (req, res) => {
  const data = { users: [], posts: [] };
  db.collection("users")
    .findOne({ email: req.params.email })
    .then((doc) => {
      data.users.push(doc);

      db.collection("posts")
        .find({ email: req.params.email })
        .forEach((book) => data.posts.push(book))
        .then(() => {
          res.status(200).json(data);
        })
        .catch(() => {
          res.status(500).json({ error: "cannot fetch" });
        })
        .catch((err) => res.status(500).json({ error: "Could not fetch" }));

      // res.status(200).json(doc);
    })
    .catch((err) => res.status(500).json({ error: "Could not fetch" }));
});

app.post("/signup", (req, res) => {
  const book = req.body;
  db.collection("users")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create" });
    });
});

app.post("/posts", (req, res) => {
  const book = req.body;
  db.collection("posts")
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ err: "could not create" });
    });
});

app.get("/posts/:email", (req, res) => {
  const books = [];
  db.collection("posts")
    .find({ email: req.params.email })
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "cannot fetch" });
    })
    .catch((err) => res.status(500).json({ error: "Could not fetch" }));
});
