const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
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


// Task 10: Get the book list available in the shop using async/await
public_users.get('/', async function (req, res) {
  //Write your code here
  try {
    const data = await new Promise((resolve, reject) => {
      resolve(books);
    });
    return res.status(300).json(data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching books"});
  }
});


// Task 11: Get book details based on ISBN using async/await
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  try {
    const isbn = req.params.isbn;
    const data = await new Promise((resolve, reject) => {
      resolve(books[isbn]);
    });
    return res.status(300).json(data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching book"});
  }
});

  
// Task 12: Get book details based on author using async/await
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  try {
    const author = req.params.author;
    const data = await new Promise((resolve, reject) => {
      let result = [];
      for (let key in books) {
        if (books[key].author === author) {
          result.push(books[key]);
        }
      }
      resolve(result);
    });
    return res.status(300).json(data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching books by author"});
  }
});


// Task 13: Get all books based on title using async/await
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  try {
    const title = req.params.title;
    const data = await new Promise((resolve, reject) => {
      let result = [];
      for (let key in books) {
        if (books[key].title === title) {
          result.push(books[key]);
        }
      }
      resolve(result);
    });
    return res.status(300).json(data);
  } catch (error) {
    return res.status(300).json({message: "Error fetching books by title"});
  }
});


// Get book review (unchanged)
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.status(300).json(books[isbn].reviews);
});

module.exports.general = public_users;


