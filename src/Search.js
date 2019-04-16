import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends React.Component {
	state = {
		showingBooks: []
	}

	render() {
		const { showingBooks } = this.state;
		const { books } = this.props;

		const searchBook = (query) => {
		    BooksAPI.search(query).then((searchResults) => {
		    	if (searchResults === undefined) {
		    		searchResults = [];
		    	} else if (searchResults.length) {
			    	searchResults.map(book => (
			    		book.shelf = 'none'
			    	));
		    	};

		    	if (query) {
				    if (searchResults.error === 'empty query') {
				    	this.setState({ showingBooks: [] });
				    } else {
				    	this.setState({ showingBooks: searchResults });
				    };
			    } else {
			    	this.setState({ showingBooks: [] });
			    };
		    });
		}

		const allBooks = showingBooks.map(function(book) {
			let noImage = {smallThumbnail: 'https://i.imgur.com/xWagOgo.png'}
			if (book.imageLinks === undefined) {
				book.imageLinks = noImage;
			};

			for (let i = 0; i < books.length; i++) {
				if (books[i].title === book.title) {
					let a = books[i].shelf;
					book.shelf = a;
				};
			};

			return book;
		})
		return (
		    <div className="search-books">
			    <div className="search-books-bar">
			        <Link
				        className="close-search"
				        to="/"
				    >Close</Link>
				    <div className="search-books-input-wrapper">
				        <input
				        	type="text"
				        	placeholder="Search by title or author"
				        	onChange={(event) => searchBook(event.target.value)}
				        />
				    </div>
			    </div>
			    <div className="search-books-results">
			        <ol className="books-grid">
						{allBooks.filter(book => book.shelf === 'none').map((book) => (
								<li key={book.id}>
				                    <div className="book">
				                      	<div className="book-top">
					                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
						                    <div className="book-shelf-changer">
						                        <select defaultValue={'none'} onChange={e => this.props.handleChange(book, e.target.value)}>
							                        <option value="move" disabled>Move to...</option>
							                        <option value="currentlyReading" defaultValue>Currently Reading</option>
							                        <option value="wantToRead">Want to Read</option>
							                        <option value="read">Read</option>
							                        <option value="none">None</option>
						                        </select>
						                    </div>
				                       	</div>
				                       	<div className="book-title">{book.title}</div>
				                      	<div className="book-authors">{book.authors}</div>
				                    </div>
				                </li>
							))}
					</ol>
			    </div>
	        </div>
		)
	}
}

export default Search;