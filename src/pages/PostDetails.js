import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from "../config/API";
import PostDetailsItem from '../components/Post/PostDetailsItem';
import Comment from '../components/Comment/Comment';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { loadPost, setNewCommentTrue, setNewCommentFalse } from '../redux/actions/postDetailsActions';

class PostDetails extends Component {

    state = {
        comment: ''
    }

    onDeletePostHandler = () => {
        API.delete("api/posts/" + this.props.match.params.post).then(response => {
            this.props.history.push("/");
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    componentDidMount() {
        this.props.loadPost(this.props.match.params.post);
    }

    onNewCommentHandler = () => {
       this.props.setNewCommentTrue();
    }

    onAddCommentHandler = () => {
        let comment = {
            blog_post_id: this.props.post.id,
            body: this.state.comment
        }
        API.post("api/comments", comment).then(response => {
            this.props.setNewCommentFalse();
            this.props.loadPost(this.props.post.id);
        });
    }

    render() {
        let post;
        let dateFormat;
        let sortedComments;
        let comments;

        if(this.props.post != ''){
            post = this.props.post;
            comments = post.comments;
            let date = new Date(post.created_at);
            dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

            if (comments != undefined) {
                sortedComments = comments.sort((a, b) => {
                    let dateA = new Date(a.created_at);
                    let dateB = new Date(b.created_at);
                    return dateB - dateA;
                })
            }
        }

        return (
            <div>
                {post == undefined ?
                    <div className="container">Post still loading..</div>
                    :
                    <div className="container">
                        <button onClick={this.onDeletePostHandler}>Delete post</button>
                        <PostDetailsItem
                            id={post.id}
                            title={post.title}
                            body={post.body}
                            created_at={dateFormat}
                            user_id={post.user_id}
                            comments_count={post.comments_count}
                        />
                        {!this.props.addComment ? <button onClick={this.onNewCommentHandler}>New Comment</button> :
                            <div className="newComment">
                                <button onClick={this.onAddCommentHandler}>Add Comment</button>
                                <CKEditor
                                    editor={ClassicEditor}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.setState({
                                            comment: data
                                        })
                                    }}
                                />
                            </div>
                        }
                        <div className="Comments">
                            {sortedComments.map(c => (
                                <Comment
                                    key={c.id}
                                    id={c.id}
                                    body={c.body}
                                    created_at={c.created_at}
                                    user={c.user}
                                    loadPost={this.loadPost}
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
        post: state.postDetails.post,
        isLoading: state.postDetails.isLoading,
        addComment : state.postDetails.addComment
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadPost: (postId) => dispatch(loadPost(postId)),
        setNewCommentFalse: () => dispatch(setNewCommentFalse()),
        setNewCommentTrue: () => dispatch(setNewCommentTrue())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(PostDetails);