import React from 'react';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
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
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf title='Currently Reading' books={this.filterBooksByShelf('currentlyReading')} onMoveBookToShelf={this.moveBookToShelf}/>
              <BookShelf title='Want to Read' books={this.filterBooksByShelf('wantToRead')} onMoveBookToShelf={this.moveBookToShelf}/>
              <BookShelf title='Read' books={this.filterBooksByShelf('read')} onMoveBookToShelf={this.moveBookToShelf}/>
            </div>
            <div className="open-search">
              <Link to='/search' >Add a book</Link>
            </div>
          </div>
        )}/>

        <Route path='/search' render={() => (
          <BookSearch searchedBooks={this.state.searchedBooks} onMoveBookToShelf={this.moveBookToShelf} updateSearchedBooks={this.updateSearchedBooks}/>
        )}/>
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

  moveBookToShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book,shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }))
      });
    }
  }
}

export default BooksApp
