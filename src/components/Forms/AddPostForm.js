import React, { Component } from 'react'
import { Form, Field, ErrorMessage } from 'formik'

export default class AddPostForm extends Component {
    render() {
        return (
            <div>
                <Form className="">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="title" />
                                <ErrorMessage name="title"></ErrorMessage>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="body" />
                                <ErrorMessage name="body"></ErrorMessage>
                            </div>
                        </div>
                    </div>
                    <input className="btn btn-primary float-right" type="submit" value="Submit"></input>
                </Form>
            </div>
        )
    }
}
