import React, {Fragment, Component} from 'react';
import './pagination.css';

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: props.currentPage || 1
        }
    }
}