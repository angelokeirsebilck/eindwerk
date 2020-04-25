import React, { Component } from 'react'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/authActions';
import LoginForm from '../components/Forms/LoginForm';
import * as Yup from 'yup';

class Login extends Component {
    subimitHandler = (values) => {
        console.log(values);
        const loginValues = {
            'grant_type': 'password',
            'client_id': 2,
            'client_secret': 'iwrHFPcaiQ3bZTzHEwQpYkpiuHUlbIOJ9SAI6DLI',
            "username": values[0],
            "password": values[1],
        }

        this.props.loginAction(loginValues);
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
      loginAction: (loginValues) => dispatch(loginAction(loginValues))
    }
  }

export default connect(MapStateToProps,MapDispatchToProps)(Login);
