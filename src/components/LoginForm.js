import React, { Component } from 'react';
import { Form, Field, ErrorMessage } from 'formik';

export default class LoginForm extends Component {
    render() {
        return (
            <Form className="">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email address</label>
                            <Field
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="name@example.com" />
                            <ErrorMessage name="email"></ErrorMessage>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Password</label>
                            <Field
                                type="password"
                                className="form-control"
                                name="password" />
                            <ErrorMessage name="password"></ErrorMessage>
                        </div>
                    </div>
                </div>
                <input className="btn btn-primary float-right" type="submit" value="Submit"></input>
            </Form>
        )
    }
}
