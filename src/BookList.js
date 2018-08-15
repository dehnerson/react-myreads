import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class BookList extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBookToShelf : PropTypes.func.isRequired
  }

  render() {
    const books = this.props.books;

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book book={book} onMoveBookToShelf={this.props.onMoveBookToShelf}/>
          </li>
        ))}
      </ol>
    )
  }
}


export default BookList;
