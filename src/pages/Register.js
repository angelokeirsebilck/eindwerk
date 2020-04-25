import React, { Component } from 'react'
import RegisterForm from '../components/Forms/RegisterForm';
import { Formik } from 'formik';
import { API } from '../config/API';
import { connect } from 'react-redux';
import { loginAction, registerAction } from '../redux/actions/authActions';
import * as Yup from 'yup';

class Register extends Component {

    subimitHandler = (values) => {
        const registerValues = {
            "first_name": values.firstname,
            "last_name": values.lastname,
            "email": values.email,
            "password": values.password,
            "favorite_color": "#f9a373",
            "avatar": "https://api.adorable.io/avatars/285/" + values.email
        }

        this.props.registerAction(registerValues, this.props.history)
    }

    validationShema = Yup.object().shape({
        firstname: Yup.string()
            .min(2,'Firstname should be longer then 2 characters')
            .matches(/[a-zA-Z]/, 'Firstname can only contain letters.')
            .required('Firstname is required'),
        lastname: Yup.string()
            .min(2,'Firstname should be longer then 2 characters')
            .required('Lastname is required'),
        email: Yup.string()
            .email('Please enter a valid email')
            .required('E-mail is required'),
        password: Yup.string()
            .min(8,'Password should be atleast 8 characters long')
            .matches(/[A-Z]/, 'Password should contain atleast 1 uppercase letter')
            .matches(/[0-9]/, 'Password should contain atleast 1 number')
            .required('Password is required')
    })

    render() {
        return (
            <div className="container">
                <Formik
                    onSubmit={this.subimitHandler}
                    validationSchema={this.validationShema}
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: ''
                    }}
                >
                    {props => <RegisterForm {...props} />}
                </Formik>
            </div>
        )
    }
}

const MapStateToProps = (state) => {
    return {

    }
}

const MapDispatchToProps = (dispatch) => {
    return {
        registerAction: (registerValues, history) => dispatch(registerAction(registerValues, history))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(Register);
