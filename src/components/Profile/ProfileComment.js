import React, { Component } from 'react'
import classes from './ProfileComment.module.css'

export default class ProfileComment extends Component {
    render() {
        const { body, created_at } = this.props
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        let commentContent = <div className={classes.Comment_body}
            dangerouslySetInnerHTML={{
                __html: body
            }}></div>;
        return (
            <div className={classes.ProfileComment}>
                <div className={classes.ProfileComment_infoContainer}>
                    <span className={classes.ProfileComment_date}> <span className={classes.ProfileComment_text}>Posted at</span> {dateFormat}</span>
                </div>
                {commentContent}
            </div>
        )
    }
}
