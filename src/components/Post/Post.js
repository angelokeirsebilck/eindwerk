import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Post.module.css';
import Truncate from 'react-truncate';
import { Link } from 'react-router-dom';

export default class Post extends Component {

    render() {

        const { id ,title, body, created_at, updated_at, user, comments_count } = this.props;
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        const link = "/posts/" + id;
        return (
            <Link to={link}>
                <div className={classes.Post}>
                    <div className={classes.Post_date}>Created at: {dateFormat}</div>
                    <div className={classes.Post_date}>By: {user.first_name}</div>
                    <div className={classes.Post_title}>{title}</div>
                    <div className={classes.Post_body}>
                        <Truncate lines={2}>{body}</Truncate>
                    </div>
                </div>
            </Link>
        )
    }
}

Post.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    comments_count: PropTypes.number.isRequired
};