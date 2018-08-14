import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class BookSearch extends React.Component {
  static propTypes = {
    searchedBooks: PropTypes.array.isRequired,
    updateSearchedBooks: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
          <BookList books={this.props.searchedBooks}/>
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
      this.props.updateSearchedBooks([]);
      return;
    }

    BooksAPI.search(query).then((searchResult) => {
      if(query !== this.state.query) return;

      if(searchResult.error) {
        this.props.updateSearchedBooks([]);
        return;
      }

      this.props.updateSearchedBooks(searchResult);
    });
  }
}


export default BookSearch;
