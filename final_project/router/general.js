const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (isValid(username)) {
      users.push({username: username, password: password});
      return res.status(300).json({message: "User successfully registered"});
    }
    return res.status(300).json({message: "User already exists"});
  }

  return res.status(300).json({message: "Unable to register user"});
});


// ✅ Task 10: Get all books using Axios + async/await
public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(300).json(response.data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching books"});
  }
});


// ✅ Task 11: Get book by ISBN using Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    return res.status(300).json(response.data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching book"});
  }
});


// ✅ Task 12: Get books by author using Axios
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    return res.status(300).json(response.data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching books by author"});
  }
});


// ✅ Task 13: Get books by title using Axios
public_users.get('/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    return res.status(300).json(response.data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching books by title"});
  }
});


// Get book review (unchanged)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn].reviews);
});

module.exports.general = public_users;


