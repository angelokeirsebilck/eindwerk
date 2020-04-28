import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from "../config/API";
import PostDetailsItem from '../components/Post/PostDetailsItem';
import Comment from '../components/Comment/Comment';
import { loadPost, unsetPost, setPostIsLoadingTrue } from '../redux/actions/postsActions';
import { Formik } from 'formik';
import AddCommentForm from '../components/Forms/AddCommentForm';
import * as Yup from 'yup';
import Loader from '../components/Loader/Loader';
import classes from './PostDetails.module.css'

class PostDetails extends Component {

    state = {
        comment: [],
        // post: [],
        isLoading: true,
        addComment: false,
        initialValues: {
            comment: ''
        }
    }

    // loadPost = (postId) => {
    //     API.get("api/posts/" + postId).then(response => {
    //         this.setState({
    //             post: response.data,
    //             isLoading: false
    //         })

    //     }).catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    // }

    onDeletePostHandler = () => {
        API.delete("api/posts/" + this.props.match.params.post).then(response => {
            this.props.history.push("/");
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onAddCommentHandler = (values, props) => {
        let comment = {
            blog_post_id: this.props.post.id,
            body: values.comment
        }
        API.post("api/comments", comment).then(response => {
            this.props.loadPost(this.props.post.id);
            props.resetForm({
                comment: ''
            })

        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    validationShema = Yup.object().shape({
        comment: Yup.string()
            .required('Comment is required')
    })

    componentDidMount() {
        this.props.setPostIsLoadingTrue();
        this.props.unsetPost();
        this.props.loadPost(this.props.match.params.post);
    }

    render() {
        const loaderStyle = {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '24px'
        }

        const { id, title, body, created_at, user_id, user, comments } = this.props.post;
        let date = new Date(created_at);
        let dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        let sortedComments = [];
        let commentsContent = "";

        if (comments) {
            sortedComments = comments.sort((a, b) => {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
            })

            if (comments.length > 0 && comments !== undefined) {
                commentsContent = <div className="Comments">
                    <div className={classes.PostDetails_title}>Comments</div>
                    {sortedComments.map(c => (
                        <Comment
                            key={c.id}
                            id={c.id}
                            body={c.body}
                            created_at={c.created_at}
                            user={c.user}
                            postId={this.props.post.id}
                        />
                    ))}
                </div>;
            }
        }

        return (
            <div>
                {this.props.postIsLoading ?
                    <div className="container" style={loaderStyle}><Loader /></div>
                    :
                    <div className="container mt-4">
                        <div className={classes.PostDetails_title}>Post</div>
                        <PostDetailsItem
                            id={id}
                            title={title}
                            body={body}
                            created_at={dateFormat}
                            user_id={user_id}
                            user={user}
                        />
                        {this.props.user ?
                            <Formik
                                onSubmit={this.onAddCommentHandler}
                                validationSchema={this.validationShema}
                                validateOnChange={false}
                                initialValues={{
                                    comment: ''
                                }}
                                render={props =>
                                    <AddCommentForm  {...props} buttonValue="add comment" />
                                }
                            >
                            </Formik>
                            : ""
                        }
                        {commentsContent}
                    </div>}
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        user: state.auth.user,
        commentEditor: state.posts.commentEditor,
        post: state.posts.post,
        postIsLoading: state.posts.postIsLoading
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadPost: (postId) => dispatch(loadPost(postId)),
        unsetPost: () => dispatch(unsetPost()),
        setPostIsLoadingTrue: () => dispatch(setPostIsLoadingTrue())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(PostDetails);