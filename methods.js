const { Firestore } = require('@google-cloud/firestore');
const { json } = require('express');
const firestore = new Firestore({
    projectId: 'ADD_PROJECT_ID',
    keyFilename: './config.json',
});

/* LIST & FILTER BOOKS */
async function listAllBooks(req) {
    let keyword = req.query.keyword;
    let books = [];
    const fetchBooks = await firestore.collection('books').orderBy("date", "desc").get();
    try {
        fetchBooks.forEach((doc) => {
            let book = doc.data();
            book.id = doc.id;
            books.push(book)
            // console.log(doc.id, '=>', doc.data());
        });
        if (keyword) {
            books = await books.filter(book => book.name.toLowerCase().includes(keyword.toLowerCase()) || book.description.toLowerCase().includes(keyword.toLowerCase()) || book.author.toLowerCase().includes(keyword.toLowerCase()))
        }
    }
    catch (err) {
        console.log('Error getting documents', err);
    }
    return {
        data: books,
        code: 200
    }
}
/* GET ANY BOOK */
async function getBookById(id) {
    const ref = firestore.collection('books').doc(id)
    const fetchBook = await ref.get();
    let doc = {};
    try {
        if (fetchBook.exists) {
            doc = fetchBook.data();
            doc.id = id;
            return {
                data: doc,
                code: 200
            }
        }
    }
    catch (err) {
        console.log('Error getting documents', err);
    }
    return {
        data: {},
        code: 404,
        meta: {
            message: 'BOOK_NOT_FOUND',
            code: 404
        }
    }
}
/* ADD NEW BOOK */
async function addNewBook(req) {
    if (req.body && req.body.name && req.body.description && req.body.author && req.body.count) {
        const bookDetails = req.body;
        const ref = firestore.collection('books')
        const addBook = await ref.add(bookDetails);
        try {
            bookDetails.id = addBook.id;
            return {
                data: bookDetails,
                code: 200
            }
        }
        catch (err) {
            console.log('Error getting documents', err);
        }
    }
    return {
        data: {},
        code: 422,
        meta: {
            message: 'UNABLE_TO_ADD_THIS_BOOK',
            code: 422
        }
    }
}
/* UPDATE AN EXISTING BOOK */
async function updateBook(req) {
    if (req.body && req.body.name && req.body.description && req.body.author && req.body.count) {
        const bookDetails = req.body;
        const ref = firestore.collection('books').doc(req.params.id)
        await ref.set(bookDetails, { merge: true });
        try {
            return {
                data: bookDetails,
                code: 200
            }
        }
        catch (err) {
            console.log('Error getting documents', err);
        }
    }
    return {
        data: {},
        code: 422,
        meta: {
            message: 'UNABLE_TO_UPDATE_THIS_BOOK',
            code: 422
        }
    }
}

module.exports = {
    listAllBooks,
    getBookById,
    addNewBook,
    updateBook
}