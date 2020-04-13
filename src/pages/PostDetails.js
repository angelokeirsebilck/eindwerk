import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from "../config/API";
import PostDetailsItem from '../components/Post/PostDetailsItem';
import Comment from '../components/Comment/Comment';

class PostDetails extends Component {

    state = {
        post: '',
        // title: '',
        // body: '',
        // created_at: '',
        // user_id: 0,
        isLoading: true
    }

    componentDidMount() {
        API.get("api/posts/" + this.props.match.params.post).then(response => {
            this.setState({
                post: response.data,
                isLoading: false
            })
        });
    }

    render() {
        const { id, title, body, created_at, updated_at, user_id, comments_count, comments } = this.state.post;
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        return (
            <div>
                {this.state.isLoading ?
                    <div className="container">Post still loading..</div>
                    :
                    <div className="container">
                        <PostDetailsItem
                            id={id}
                            title={title}
                            body={body}
                            created_at={dateFormat}
                            user_id={user_id}
                            comments_count={comments_count}
                        />
                        <div className="Comments">
                            {comments.map(c => (
                                <Comment
                                    key={c.id}
                                    body={c.body}
                                    created_at={c.created_at}
                                    user={c.user}
                                />
                            ))}
                        </div>
                    </div>}
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {

    }
}

const MapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(MapStateToProps, MapDispatchToProps)(PostDetails);