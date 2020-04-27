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
                                    class={'form-control' + (this.props.errors.body && this.props.touched.body ? ' is-invalid' : '')}
                                    data= {this.props.errors.body && this.props.touched.body ? '' : this.props.values.body}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.props.setFieldValue("body", data);
                                    }}
                                />
                            <ErrorMessage name="body" component="div" style={this.props.errors.body && this.props.touched.body ? displayBlock : ''} className="invalid-feedback " />
                            </div>
                        </div>
                    </div>
                    <input className="Button_primary mt-4" type="submit" value={this.props.buttonValue}></input>
                </Form>
            </div>
        )
    }
}
