import React from 'react'

class ShelfChange extends React.Component {
	render() {
		return (
			<select defaultValue={shelf} onChange={e => this.props.handleChange(book, e.target.value)}>
				<option value="move" disabled>Move to...</option>
				<option value="currentlyReading" defaultValue>Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
			</select>
		)
	}
}

export default ShelfChange;
