import React from 'react'

class Book extends React.Component {
  render() {
    const book = this.props.book;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url({book.thumbnail})' }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" selected={book.shelf === 'currentlyReading'}>Currently Reading</option>
              <option value="wantToRead" selected={book.shelf === 'wantToRead'}>Want to Read</option>
              <option value="read" selected={book.shelf === 'read'}>Read</option>
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
