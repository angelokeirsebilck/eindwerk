import React, { Component } from 'react';
import { Form, Field, ErrorMessage } from 'formik';

export default class RegisterForm extends Component {
    render() {
        return (
            <Form className="">
                <div className="row mt-4">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <Field
                                type="text"
                                name="firstname"
                                className="form-control"
                                id="firstname" />
                            <ErrorMessage name="firstname"></ErrorMessage>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <Field
                                type="text"
                                name="lastname"
                                className="form-control"
                                id="lastname" />
                            <ErrorMessage name="lastname"></ErrorMessage>
                        </div>
                    </div>
                </div>
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
