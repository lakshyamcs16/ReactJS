import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList({ data }) {
    const [selected, setSelected] = useState(null);

    return (
        data.loading? <div>Loading Books...</div> :
        <div>
            <ul id="book-list">
                {
                    data.books.map(book => <li key={book.id} onClick={() => { setSelected(book.id) }}>{book.name}</li>)
                }
            </ul>
            <BookDetails bookId={selected}/>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);