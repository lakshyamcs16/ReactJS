import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

function AddBook({ getAuthorsQuery, addBookMutation }) {
    
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const displayAuthors = () => {
        if(getAuthorsQuery.loading) {
            return <option>Loading Authors...</option>
        }else{
            return getAuthorsQuery.authors.map(author => {
                return <option key={author.id} value={author.id}>{author.name}</option>
            });
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        addBookMutation({
            variables: {
                name, 
                genre, 
                authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
