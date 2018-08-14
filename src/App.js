import React from 'react';
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    searchedBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books});
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch searchedBooks={this.state.searchedBooks} updateSearchedBooks={this.updateSearchedBooks}/>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf title='Currently Reading' books={this.filterBooksByShelf('currentlyReading')}/>
              <BookShelf title='Want to Read' books={this.filterBooksByShelf('wantToRead')}/>
              <BookShelf title='Read' books={this.filterBooksByShelf('read')}/>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }

  filterBooksByShelf = (shelf) => {
    return this.state.books.filter((book) => book.shelf === shelf);
  }

  updateSearchedBooks = (searchResults) => {
    this.setState({searchedBooks: searchResults.map((searchResult) => {
      //Replace searched books by books which are in one of the shelves already...
      // to show the right shelf information also in Search screen!
      const shelfBook = this.state.books.find((book) => book.id === searchResult.id);
      return shelfBook ? shelfBook : searchResult;
    })});
  }
}

export default BooksApp
