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
    searchedBooks: [],
    isLoading: false
  }

  componentDidMount(){
		this.searchInput.focus();
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
            <input ref={(ref) => {this.searchInput = ref}} type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
          {this.state.isLoading && (<div className="loader"/>)}
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

    this.setState({isLoading: true});

    BooksAPI.search(query).then((searchResults) => {
      if(query !== this.state.query) return;

      if(searchResults.error) {
        this.updateSearchedBooks([]);
        return;
      }

      this.updateSearchedBooks(searchResults);
    }).catch((e) => {
      if(query !== this.state.query) return;

      this.updateSearchedBooks([]);
    });
  }

  updateSearchedBooks = (searchResults) => {
    this.setState({isLoading: false, searchedBooks: searchResults.map((searchResult) => {
      //Enhance search results with shelf property from shelf books
      try {
        searchResult.shelf = this.props.shelfBooks.find((book) => book.id === searchResult.id).shelf;
        return searchResult;
      }
      catch(e) {
        return searchResult;
      }
    })});
  }
}


export default BookSearch;
