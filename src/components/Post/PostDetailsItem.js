import React, { Component } from 'react'
import PropTypes from 'prop-types';
import classes from './PostDetailsItem.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { API } from '../../config/API';
import { withRouter } from 'react-router-dom'
import AddPostForm from '../Forms/AddPostForm';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { loadPost, unsetPost, setPostIsLoadingTrue } from '../../redux/actions/postsActions';

class PostDetailsItem extends Component {

    state = {
        editing: false
    }

    onDeleteHandler = () => {
        API.delete("api/posts/" + this.props.id).then(response => {
            this.props.history.push("/");
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    onEditHandler = () => {
        this.setState({
            editing: true
        })
    }

    validationShema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        body: Yup.string()
            .required('Content is required'),
    })

    onEditPostHandler = (values) => {

        const editPostValues = {
            "title": values.title,
            "body": values.body
        }
        this.props.setPostIsLoadingTrue();
        this.props.unsetPost();

        API.put("api/posts/" + this.props.id, editPostValues).then(response => {
            this.setState({
                editing: false
            })
            this.props.loadPost(this.props.id);
        }).catch(function (error) {
            // handle error
            console.log(error);
        });

    }

    render() {
        const { title, body, created_at, user, loggedUser } = this.props;
        const profileLink = '/profile/' + user.id;
        let postContent;

        if (this.state.editing) {
            postContent = <Formik
                onSubmit={this.onEditPostHandler}
                validationSchema={this.validationShema}
                initialValues={{
                    title: title,
                    body: body
                }}
                render={props =>
                    <AddPostForm  {...props} buttonValue="edit post" />
                }
            >
            </Formik>
        }
        else {
            postContent = <div>
                <div className={classes.Post_title}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}></div>
                </div>
                <div className={classes.Post_body}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: body
                        }}></div>
                </div>
            </div>;
        }
        let editBlock;
        if (user != undefined && loggedUser != undefined) {
            if (user.id == loggedUser.id) {
                editBlock = <span><button className="Button_secondary" onClick={this.onEditHandler}>edit</button>
                    <button className="Button_secondary" onClick={this.onDeleteHandler}>delete</button></span>;
            }
        }
        return (
            <div className={classes.Post}>
                <div className={classes.Post_date}>Posted by <Link to={profileLink} className={classes.Post_username}> <span > {user.first_name}</span></Link> at {created_at}
                    {editBlock}
                </div>

                {postContent}
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

export default withRouter(connect(MapStateToProps, MapDispatchToProps)(PostDetailsItem));

PostDetailsItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired
};

