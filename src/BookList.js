import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const books = this.props.books;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li>
            <Book book={book}/>
          </li>
        ))}
      </ol>
    )
  }
}


export default BookList;
