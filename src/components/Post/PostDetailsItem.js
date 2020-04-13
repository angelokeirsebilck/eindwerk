import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classes from './PostDetailsItem.module.css';

export default class PostDetailsItem extends Component {
    render() {
        const { id, title, body, created_at, updated_at, user_id, comments_count, comments } = this.props;
        return (
            <div className={classes.Post}>
                    <div className={classes.Post_date}>Created at: {created_at}</div>
                    <div className={classes.Post_date}>By: {user_id}</div>
                    <div className={classes.Post_title}>{title}</div>
                    <div className={classes.Post_body}>
                        {body}
                    </div>
                </div>
        )
    }
}

PostDetailsItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired
};

