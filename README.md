## BooK Library MS
* Built with ReactJS, Recact Router.
* State Management by Redux.
* Backend by Nodejs(ExpressJS).
* Backend deployed to Google Cloud App Engine.
* Front End deployed to Goodgle Cloud Hosting(Firebase)
* Database - Google Cloud Firestore.
* Design own css.

## Start Back End Application.

* In the project directory, install dependencies: `yarn install`
* In the project directory, you can run: `yarn start`
* Runs the app in the development mode. Open [http://localhost:8080](http://localhost:8080) to view it in the browser/POSTMAN.
* add config to `middleware.js`
* add config to `methods.js`
* replace `config.json` values with Google Cloud Firestore Credentials.
* To build the application `yarn build` Builds the app for production to the `build` folder.

Your app is ready to be deployed!

## BackEnd APIS
* `/list` - Return all the books.
* `/list?keyword=steve` Return filtered books based on keyword.
* `/books/add` - Add new book (Name, Description, Author, Count).
* `/books/:id/` - View particular book details.
* `/books/:id/edit` - Edit particular book details.

[View It's Front-End Project](https://github.com/argodeep/Book-Library-ReactJS)
