const express = require('express');
const app = express();
const { listAllBooks, getBookById, addNewBook, updateBook } = require('./methods.js')
const port = process.env.PORT || 8080;
const jwt = require('./middleware.js');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt);




// Default Route
app.get('/', (req, res) => {
    res.status(200).send(`${process.env.NAME}`);
});

// List All Books & Filter By Keyword Route
app.get('/list', async (req, res) => {
    const dataResponse = await listAllBooks(req);
    res.status(dataResponse.code).json(response(dataResponse));
});

// Get Any Book By Id
app.get('/books/:id', async (req, res) => {
    const dataResponse = await getBookById(req.params.id);
    res.status(dataResponse.code).json(response(dataResponse));
});

// Add new book
app.post('/books/add', async (req, res) => {
    const dataResponse = await addNewBook(req);
    res.status(dataResponse.code).json(response(dataResponse));
});

// Update a book
app.put('/books/:id', async (req, res) => {
    const dataResponse = await updateBook(req);
    res.status(dataResponse.code).json(response(dataResponse));
});

// 404 not found
app.get('*', function (req, res) {
    res.status(404).send('NOT_FOUND');
});

app.listen(port, () => {
    console.log('Book Library listening on port', port);
});

// API response abstraction
function response(resp) {
    return {
        data: resp.data,
        meta: resp.meta || {}
    }
}