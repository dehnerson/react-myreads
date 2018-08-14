import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

class BookShelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onMoveBookToShelf : PropTypes.func.isRequired
  }

  render() {
    const title = this.props.title;
    const books = this.props.books;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BookList books={books} onMoveBookToShelf={this.props.onMoveBookToShelf}/>
        </div>
      </div>
    )
  }
}


export default BookShelf;
