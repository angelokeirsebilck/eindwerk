import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Comment.module.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { saveComment } from '../../redux/actions/commentsActions';
import { connect } from 'react-redux';
import { API } from '../../config/API';
import { loadPost, setPostIsLoadingTrue, unsetPost } from '../../redux/actions/postsActions';
import AddCommentForm from '../Forms/AddCommentForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Comment extends Component {

    state = {
        editing: false,
        id: undefined,
        body: ''
    }

    componentDidMount() {

        this.setState({
            body: this.props.body,
            id: this.props.id
        })
    }

    onEditCommentHandler = (values) => {
        this.props.setPostIsLoadingTrue();
        const { id } = this.state;
        let comment = {
            id: id,
            body: values.comment
        }
        this.props.unsetPost();

        API.put("api/comments/" + id, comment).then(response => {
            this.setState({
                editing: false
            })

            this.props.loadPost(this.state.id);
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    validationShema = Yup.object().shape({
        comment: Yup.string()
            .required('Comment is required')
    })

    onEditHandler = () => {
        this.setState({
            editing: true
        })
    }

    onSaveHandler = () => {
        const { body, id } = this.state;
        let comment = {
            id: id,
            body: body
        }
        API.put("api/comments/" + id, comment).then(response => {
            this.setState({
                edit: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onDeleteHandler = () => {
        const { id } = this.state;
        API.delete("api/comments/" + id).then(response => {
            //this.props.loadPost(this.props.postId)

        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const { created_at } = this.props;
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        const { body } = this.state;
        let editBlock = "";
        // if (this.props.user != undefined && this.props.loggedUser != undefined) {
        //     if (this.props.user.id == this.props.loggedUser.id) {
        //         editBlock = <div>{!this.state.edit ? <button onClick={this.onEditHandler}>Edit</button> : <button onClick={this.onSaveHandler}>Save</button>}
        //             <button onClick={this.onDeleteHandler}>Delete</button> </div>;
        //     }
        // }

        if (this.props.user != undefined && this.props.loggedUser != undefined) {
            if (this.props.user.id == this.props.loggedUser.id) {
                editBlock = <span><button className="Button_secondary" onClick={this.onEditHandler}>edit</button>
                    <button className="Button_secondary" onClick={this.onDeleteHandler}>delete</button></span>;
            }
        }

        let commentContent;

        if (this.state.editing) {
            commentContent = <Formik
                onSubmit={this.onEditCommentHandler}
                validationSchema={this.validationShema}
                initialValues={{
                    comment: this.props.body
                }}
                render={props =>
                    <AddCommentForm  {...props} buttonValue="edit comment" />
                }
            >
            </Formik>
        }
        else {
            commentContent = <div>{this.props.body}</div>;
        }

        return (
            <div className={classes.Comment}>
                {/* {editBlock}
                {!this.state.edit ? body :
                    <CKEditor
                        editor={ClassicEditor}
                        data={body}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            //console.log( 'Editor is ready to use!', editor );
                            console.log("editor init")

                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({
                                body: data
                            })
                            //console.log( { event, editor, data } );
                        }}
                        onBlur={(event, editor) => {
                            //console.log( 'Blur.', editor );
                        }}
                        onFocus={(event, editor) => {
                            //console.log( 'Focus.', editor );
                        }}
                    />
                } */}
                <img className={classes.Comment_avatar} src={this.props.user.avatar} alt="" />
                <span className>{this.props.user.first_name}</span>
                {editBlock}
                {commentContent}
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        loggedUser: state.auth.user
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadPost: (postId) => dispatch(loadPost(postId)),
        unsetPost: () => dispatch(unsetPost()),
        setPostIsLoadingTrue: () => dispatch(setPostIsLoadingTrue())
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Comment);

Comment.propTypes = {
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};