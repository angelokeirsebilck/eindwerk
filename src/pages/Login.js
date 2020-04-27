import React, { Component } from 'react'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/authActions';
import LoginForm from '../components/Forms/LoginForm';
import * as Yup from 'yup';

class Login extends Component {
    subimitHandler = (values) => {
        const loginValues = {
            'grant_type': 'password',
            'client_id': 2,
            'client_secret': 'iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI',
            "username": values.email,
            "password": values.password,
        }

        this.props.loginAction(loginValues,this.props.history);
    }

    validationShema = Yup.object().shape({
        email: Yup.string()
            .required('Firstname is required'),
        password: Yup.string()
            .required('Password is required')
    })

    render() {
        return (
            <div className="container">
                <Formik
                    onSubmit={this.subimitHandler}
                    validationSchema={this.validationShema}
                    initialValues={{
						email: '',
						password: ''
					}}
                >
                    {props => <LoginForm {...props} />}
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
      loginAction: (loginValues,history) => dispatch(loginAction(loginValues,history))
    }
  }

export default connect(MapStateToProps,MapDispatchToProps)(Login);
