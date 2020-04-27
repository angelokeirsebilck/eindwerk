import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classes from './PostDetailsItem.module.css';
import { Link } from 'react-router-dom';

export default class PostDetailsItem extends Component {

    render() {
        const { title, body, created_at, user} = this.props;
        const profileLink = '/profile/' + user.id;
        return (
            <div className={classes.Post}>
                <div className={classes.Post_date}>Posted by <Link to={profileLink} className={classes.Post_username}> <span > {user.first_name}</span></Link> at {created_at}
                    <button className="Button_secondary">delete</button>
                </div>
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

