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
                                className={'form-control' + (this.props.errors.firstname && this.props.touched.firstname ? ' is-invalid' : '')}
                                id="firstname" />
                            <ErrorMessage name="firstname" component="div" className="invalid-feedback"></ErrorMessage>
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
                                className={'form-control' + (this.props.errors.lastname && this.props.touched.lastname ? ' is-invalid' : '')}
                                id="lastname" />
                            <ErrorMessage name="lastname" component="div" className="invalid-feedback"></ErrorMessage>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Email address</label>
                            <Field
                                type="email"
                                className={'form-control' + (this.props.errors.email && this.props.touched.email ? ' is-invalid' : '')}
                                name="email"
                                placeholder="name@example.com" />
                            <ErrorMessage name="email" component="div" className="invalid-feedback"></ErrorMessage>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Password</label>
                            <Field
                                type="password"
                                className={'form-control' + (this.props.errors.password && this.props.touched.password ? ' is-invalid' : '')}
                                name="password" />
                            <ErrorMessage name="password" component="div" className="invalid-feedback"></ErrorMessage>
                        </div>
                    </div>
                </div>
                <input className="Button_primary mt-4" type="submit" value="Register"></input>
            </Form>
        )
    }
}
