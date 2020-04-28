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
import { MdDelete, MdModeEdit } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';

class Comment extends Component {

    state = {
        editing: false,
        id: undefined,
        body: '',
        postId: undefined
    }

    componentDidMount() {

        this.setState({
            body: this.props.body,
            id: this.props.id,
            postId: this.props.postId
        })
    }

    onEditCommentHandler = (values) => {

        const { id } = this.state;
        let comment = {
            id: id,
            body: values.comment
        }

        API.put("api/comments/" + id, comment).then(response => {
            this.setState({
                editing: false
            })
            this.props.setPostIsLoadingTrue();
            this.props.unsetPost();
            this.props.loadPost(this.state.postId);
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
            this.props.loadPost(this.state.postId)
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        const { created_at, user } = this.props;
        const date = new Date(created_at);
        const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
        const { body } = this.state;
        const profileLink = '/profile/' + user.id;
        let btnStyle = ["Button_secondary"];
        let commentContent;
        let editBlock = "";

        if (this.props.user != undefined && this.props.loggedUser != undefined) {
            if (this.props.user.id == this.props.loggedUser.id) {
                editBlock = <span>
                    <button className={btnStyle.join(" ")} onClick={this.onEditHandler}>
                        <IconContext.Provider value=''>
                            <div>
                                <MdModeEdit size="24" />
                            </div>
                        </IconContext.Provider>
                    </button>
                    <button className="Button_secondary" onClick={this.onDeleteHandler}>
                        <IconContext.Provider value=''>
                            <div>
                                <MdDelete size="24" />
                            </div>
                        </IconContext.Provider>
                    </button>
                </span>;
            }
        }

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

            btnStyle.push("Button--disabled");
        }
        else {
            commentContent = <div className={classes.Comment_body}
                dangerouslySetInnerHTML={{
                    __html: this.props.body
                }}></div>;
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

                <div className={classes.Comment_userContainer}>
                    <img className={classes.Comment_avatar} src={this.props.user.avatar} alt="" />
                    <div className={classes.Comment_infoContainer}>

                        <Link to={profileLink} className={classes.Comment_link}>
                         <span className={classes.Comment_text}></span> by <span className={classes.Comment_username}>  {user.first_name}</span>
                        </Link>
                        <span className={classes.Comment_date}> <span className={classes.Comment_text}>at</span> {dateFormat} {editBlock}</span>
                    </div>
                </div>
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