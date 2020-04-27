import React, { Component } from 'react'
import { Form, Field, ErrorMessage } from 'formik'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from 'react-redux';
import { setCommentEditor } from '../../redux/actions/postsActions';

class AddCommentForm extends Component {

    render() {

        const displayBlock ={
            display: 'block'
        }

        return (
            <div>
                <Form className="">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <CKEditor
                                    name="comment"
                                    editor={ClassicEditor}
                                    class={'form-control' + (this.props.errors.comment && this.props.touched.comment ? ' is-invalid' : '')}
                                    data= {this.props.errors.title && this.props.touched.title ? '' : this.props.values.wysiwyg}
                                    onInit={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        this.props.setCommentEditor(editor);
                                    } }
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.props.setFieldValue("comment", data);
                                    }}
                                />
                                <ErrorMessage name="comment" component="div" style={this.props.errors.comment && this.props.touched.comment ? displayBlock : ''} className="invalid-feedback " />
                                <input className="Button_primary mt-4" type="submit" value="add comment"></input>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        commentEditor: state.posts.commentEditor
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        setCommentEditor: (editor) => dispatch(setCommentEditor(editor))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(AddCommentForm);