import React, { Component } from 'react';
import classes from './ProfilePost.module.css';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';

export default class ProfilePost extends Component {
    render() {
        const { id, title, body,created_at } = this.props;
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        const link = "/posts/" + id;
        return (
            <Link to={link} className={classes.ProfilePost_link}>
                <div className={classes.ProfilePost}>
                    <div className={classes.Post_date}>Posted at {dateFormat}</div>
                    <div className={classes.ProfilePost_title}>{title} </div>
                    <div className={classes.ProfilePost_body}>
                        <Truncate lines={2}><div
                            dangerouslySetInnerHTML={{
                                __html: body
                            }}></div></Truncate>
                    </div>
                </div>
            </Link>
        )
    }
}
