import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {
    const book = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <img className='book-cover' src={book.imageLinks.thumbnail} alt={book.title}/>
          <div className="book-shelf-changer">
            <select defaultValue={book.shelf ? book.shelf : 'none'}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}


export default Book;
