import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BookList extends React.Component {
	state = {
		books: this.props.books
	}

	getShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then((result) => {
		    book.shelf = shelf;
		    this.setState(state => ({
		    	books: state.books.filter(b => b.id !== book.id).concat([book])
		    }));
	    });
    };

	render() {
		const { books } = this.props
		const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
		const read = books.filter(book => book.shelf === 'read');
		const wantToRead = books.filter(book => book.shelf === 'wantToRead');

		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
	                <h2 className="bookshelf-title">Currently Reading</h2>
	                <Shelf
						books={currentlyReading}
						shelf={'currentlyReading'}
						getShelf={this.getShelf}
	                />
	            </div>
                <div className="bookshelf">
                	<h2 className="bookshelf-title">Want to Read</h2>
                  	<Shelf
						books={wantToRead}
						shelf={'wantToRead'}
						getShelf={this.getShelf}
	                />
                </div>
                <div className="bookshelf">
	                <h2 className="bookshelf-title">Read</h2>
	                <Shelf
						books={read}
						shelf={'read'}
						getShelf={this.getShelf}
	                />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
		)
	}
}

export default BookList;