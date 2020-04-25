import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Comment.module.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { saveComment } from '../../redux/actions/commentsActions';
import { connect } from 'react-redux';
import { API } from '../../config/API';
import { loadPost } from '../../redux/actions/postDetailsActions'

class Comment extends Component {

    state = {
        edit: false,
        id: undefined,
        body: ''
    }

    componentDidMount() {
        this.setState({
            body: this.props.body,
            id: this.props.id
        })
    }

    onEditHandler = () => {
        this.setState({
            edit: true
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
            this.props.loadPost(this.props.postId)

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
        if (this.props.user != undefined && this.props.loggedUser != undefined) {
            if (this.props.user.id == this.props.loggedUser.id) {
                editBlock =  <div>{!this.state.edit ? <button onClick={this.onEditHandler}>Edit</button> : <button onClick={this.onSaveHandler}>Save</button>}
                <button onClick={this.onDeleteHandler}>Delete</button> </div>;
            }
        }

        return (
            <div className={classes.Comment}>
                {editBlock}
                {!this.state.edit ? body :
                    <CKEditor
                        editor={ClassicEditor}
                        data={body}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            //console.log( 'Editor is ready to use!', editor );
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
                }

            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        postId: state.postDetails.post.id,
        loggedUser: state.auth.user
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        loadPost: (postId) => dispatch(loadPost(postId))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Comment);

Comment.propTypes = {
    body: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};