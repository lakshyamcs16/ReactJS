import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

function BookDetails({ data }) {
    const displayBookDetials = () => {
        const { book } = data;
        if(data.loading) {
            return (
                <div>Geting book details....</div>
            )
        }
        if(book) {
            return (
                <div>
                    <h2>{ book.name }</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author: </p>
                    <ul className="other-books">
                        {
                            book.author.books.map(book => {
                                return (
                                    <li key={book.id}>
                                        {book.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return (
                <div>No book selected...</div>
            )
        }
    }

    return (
        <div id="book-details">
            {displayBookDetials()}
        </div>
    )
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);