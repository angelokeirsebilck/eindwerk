import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API } from "../config/API";
import PostDetailsItem from '../components/Post/PostDetailsItem';
import Comment from '../components/Comment/Comment';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { loadPost, setNewCommentTrue, setNewCommentFalse } from '../redux/actions/postDetailsActions';
import { Formik } from 'formik';
import AddCommentForm from '../components/Forms/AddCommentForm';
import * as Yup from 'yup';

class PostDetails extends Component {

    state = {
        comment: [],
        post: [],
        isLoading: true,
        addComment: false,
    }

    loadPost = (postId) => {
        API.get("api/posts/" + postId).then(response => {
            this.setState({
                post: response.data,
                isLoading: false
            })

        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }

    onDeletePostHandler = () => {
        API.delete("api/posts/" + this.props.match.params.post).then(response => {
            this.props.history.push("/");
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onAddCommentHandler = (values) => {
        let comment = {
            blog_post_id: this.state.post.id,
            body: values.comment
        }
        API.post("api/comments", comment).then(response => {
            this.loadPost(this.state.post.id);
            this.props.commentEditor.setData("");
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
        //this.props.loadPost(this.props.match.params.post);
        this.loadPost(this.props.match.params.post);
    }

    // onNewCommentHandler = () => {
    //     //this.props.setNewCommentTrue();
    //     this.setState({
    //         addComment: true
    //     })
    // }

    // onAddCommentHandler = () => {
    //     let comment = {
    //         blog_post_id: this.props.post.id,
    //         body: this.state.comment
    //     }
    //     API.post("api/comments", comment).then(response => {
    //         // this.props.setNewCommentFalse();
    //         // this.props.loadPost(this.props.post.id);
    //         this.setState({
    //             addComment: true
    //         })
    //         this.loadPost(this.state.post.id)
    //     });
    // }

    render() {
        // let post;
        // let dateFormat;
        // let sortedComments;
        // let comments;

        // if(this.props.post != ''){
        //     post = this.props.post;
        //     comments = post.comments;
        //     let date = new Date(post.created_at);
        //     dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

        //     if (comments != undefined) {
        //         sortedComments = comments.sort((a, b) => {
        //             let dateA = new Date(a.created_at);
        //             let dateB = new Date(b.created_at);
        //             return dateB - dateA;
        //         })
        //     }
        // }

        const { id, title, body, created_at, user_id, user, comments_count, comments } = this.state.post;
        let date = new Date(created_at);
        let dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        let sortedComments = [];

        if (comments) {
            sortedComments = comments.sort((a, b) => {
                let dateA = new Date(a.created_at);
                let dateB = new Date(b.created_at);
                return dateB - dateA;
            })
        }

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
                            user={user}
                            comments_count={comments_count}
                        />
                        {this.props.user ?
                            <Formik
                                onSubmit={this.onAddCommentHandler}
                                validationSchema={this.validationShema}
                                validateOnChange={false}
                                initialValues={{
                                    comment: ''
                                }}
                            >
                                {props => <AddCommentForm {...props} />}
                            </Formik>
                            : ""
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
        user: state.auth.user,
        commentEditor: state.posts.commentEditor
    }
}

const MapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(MapStateToProps, MapDispatchToProps)(PostDetails);