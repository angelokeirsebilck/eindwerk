import React, { Component } from 'react'
import { API } from '../../config/API';
import classes from './ProfileItem.module.css';
import ProfilePost from './ProfilePost';
import Loader from '../Loader/Loader';
import ProfileComment from './ProfileComment';

export default class ProfileItem extends Component {
    state = {
        user: [],
        isLoading: true
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = () => {
        API.get("api/users/" + this.props.userId).then(response => {
            this.setState({
                user: response.data,
                isLoading: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const user = this.state.user;

        const loaderStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
        }
        let infoContent = <div className="container" style={loaderStyle}><Loader/></div> ;
        if (!this.state.isLoading) {
            const sortedPosts = user.blog_posts.sort((a, b) => {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
            })
            const slicedPosts = sortedPosts.slice(0,5);

            const sortedComments = user.comments.sort((a, b) => {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
            })
            const slicedComments = sortedComments.slice(0,5);

            infoContent =
            <div className="container mt-4">
                <div className={classes.ProfileItem}>
                    <div className={classes.ProfileItem_title}>
                        Info
                    </div>
                    <div className={classes.ProfileItem_infoContainer}>
                        <div className={classes.ProfileItem_item}>
                            <div className={classes.ProfileItem_header}>Avatar</div>
                            <div className={classes.ProfileItem_itemContent}><img className={classes.ProfileItem_avatar} src={user.avatar} alt="" /></div>
                        </div>
                        <div className={classes.ProfileItem_item}>
                            <div className={classes.ProfileItem_header}>Firstname</div>
                            <div className={classes.ProfileItem_itemContent}>{user.first_name}</div>
                        </div>
                        <div className={classes.ProfileItem_item}>
                            <div className={classes.ProfileItem_header}>Lastname</div>
                            <div className={classes.ProfileItem_itemContent}>{user.last_name}</div>
                        </div>
                        <div className={classes.ProfileItem_item}>
                            <div className={classes.ProfileItem_header}>E-mail</div>
                            <div className={classes.ProfileItem_itemContent}>{user.email}</div>
                        </div>
                    </div>
                    <div className={classes.ProfileItem_postsTitle}>
                        Recent Posts
                    </div>
                    <div className={classes.ProfileItem_postsContainer}>
                        {slicedPosts.map(b => (
                                <ProfilePost
                                    id={b.id}
                                    title={b.title}
                                    body={b.body}
                                    created_at={b.created_at}
                                />
                            ))}
                    </div>
                    <div className={classes.ProfileItem_title}>
                        Recent Comments
                    </div>
                    <div className={classes.ProfileItem_recentCommentsContainer}>
                        {slicedComments.map(c => (
                            <ProfileComment
                                            body={c.body}
                                            created_at={c.created_at}
                            />
                        ))}
                    </div>
                </div>
            </div>
        }
        return (
            <div>{infoContent}</div>
        )
    }
}


