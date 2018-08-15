# MyReads App

This project formed out of the [Udacity Front-End Web Developer Nanodegree Program](https://udacity.com/course/front-end-web-developer-nanodegree--nd001). It is part of the React course.
MyReads is a bookshelf app that allows users to select and categorize books they have read, want to read or are currently reading.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

```
git clone https://github.com/dehnerson/react-myreads.git
cd myreads
```

Install dependencies and run with:

[npm](https://www.npmjs.com/)
```
npm install
npm start
```
or

[yarn](https://yarnpkg.com/en/)
```
yarn install
yarn start
```

## Backend Server

To simplify development process, Udacity provides a backend server for you to develop against.
The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations
on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

### Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can
be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend,
so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.


## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
