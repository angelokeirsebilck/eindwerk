import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Comment.module.css';

export default class Comment extends Component {
    render() {
        const {body, user, created_at} = this.props;
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        return (
            <div className={classes.Comment}>
                {body}
            </div>
        )
    }
}

Comment.propTypes = {
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};