import React from 'react';
import {Link} from 'react-router-dom';
import BookList from './BookList';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class BookSearch extends React.Component {
  static propTypes = {
    shelfBooks: PropTypes.array.isRequired,
    onMoveBookToShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searchedBooks: []
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <BookList books={this.state.searchedBooks} onMoveBookToShelf={this.props.onMoveBookToShelf}/>
        </div>
      </div>
    )
  }

  updateQuery = (query) => {
    this.setState({query: query}, this.search);
  }

  search = () => {
    const query = this.state.query;

    if(!query) {
      this.updateSearchedBooks([]);
      return;
    }

    BooksAPI.search(query).then((searchResults) => {
      if(query !== this.state.query) return;

      if(searchResults.error) {
        this.updateSearchedBooks([]);
        return;
      }

      this.updateSearchedBooks(searchResults);
    });
  }

  updateSearchedBooks = (searchResults) => {
    this.setState({searchedBooks: searchResults.map((searchResult) => {
      //Replace searched books by books which are in one of the shelves already...
      // to show the right shelf information also in Search screen!
      const shelfBook = this.props.shelfBooks.find((book) => book.id === searchResult.id);
      return shelfBook ? shelfBook : searchResult;
    })});
  }
}


export default BookSearch;
