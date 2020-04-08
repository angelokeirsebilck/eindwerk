import React, { Component } from 'react'
import RegisterForm from '../components/RegisterForm'
import { Formik } from 'formik';
import { API } from '../config/API';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/authActions';
import LoginForm from '../components/LoginForm';

class Login extends Component {
    subimitHandler = (values) => {
        const loginValues = {
            'grant_type': 'password',
            'client_id': 2,
            'client_secret': 'iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI',
            "username": document.querySelector("[name=email]").value,
            "password": document.querySelector("[name=password]").value,
        }

        this.props.loginAction(loginValues);
    }

    validateHandler = (values) => {
        const errors = {};

        const requiredFields = ["email","password"];

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
						email: '',
						password: ''
					}}
                >
                    <LoginForm />
                </Formik>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth
    }
  }

  const MapDispatchToProps = (dispatch) => {
    return {
      loginAction: (loginValues) => dispatch(loginAction(loginValues))
    }
  }

export default connect(MapStateToProps,MapDispatchToProps)(Login);
