import React, { Component } from 'react'
import { Form, Field, ErrorMessage } from 'formik'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class AddPostForm extends Component {

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
                                <label htmlFor="title">Title</label>
                                <div className="tes"></div>
                                <Field
                                    type="text"
                                    className={'form-control' + (this.props.errors.title && this.props.touched.title ? ' is-invalid' : '')}
                                    name="title" />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="body">Content</label>
                                <CKEditor
                                    name="wysiwyg"
                                    editor={ClassicEditor}
                                    class={'form-control' + (this.props.errors.title && this.props.touched.title ? ' is-invalid' : '')}
                                    data= {this.props.errors.title && this.props.touched.title ? '' : this.props.values.wysiwyg}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.props.setFieldValue("wysiwyg", data);
                                    }}
                                />
                            <ErrorMessage name="wysiwyg" component="div" style={this.props.errors.title && this.props.touched.title ? displayBlock : ''} className="invalid-feedback " />
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-primary float-right" type="submit" value="Submit"></input>
                </Form>
            </div>
        )
    }
}
