import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList.js'
import Search from './Search.js'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(shelf, book.id).then((result) => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };

  searchBook = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState({ books });
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <Search
              searchBook={this.searchBook}
              handleChange={this.changeShelf}
              books={this.state.books}
            />
        )}/>
        <Route
          exact path="/"
          render={() => (
            <BookList
              books={this.state.books}
              handleChange={this.changeShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
