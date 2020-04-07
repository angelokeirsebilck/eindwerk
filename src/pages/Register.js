import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import { Formik } from 'formik';

export default class Register extends Component {

    subimitHandler = (values) => {
        console.log(values);
    }

    validateHandler = (values) => {
        const errors = {};

        const requiredFields = ["firstname","lastname","email"];

        requiredFields.forEach(field => {
            if (!values[field]) {
                errors[field] = "required";
            }
        });

        return errors
    }

    render() {
        return (
            <div className="container">
                <Formik
                    onSubmit={this.subimitHandler}
                    validate={this.validateHandler}
                    initialValues={{
						firstname: '',
						lastname: '',
						email: ''
					}}
                >
                    <RegisterForm />
                </Formik>
            </div>
        )
    }
}
