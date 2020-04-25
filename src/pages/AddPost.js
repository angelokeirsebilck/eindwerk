import React, { Component } from 'react'
import { Formik } from 'formik'
import AddPostForm from '../components/Forms/AddPostForm'
import { addPostAction } from '../redux/actions/postsActions'
import { connect } from 'react-redux'
import * as Yup from 'yup';

class AddPost extends Component {

    subimitHandler = (values) => {
        const addPostValues = {
            "title": document.querySelector("[name=title]").value,
            "body": document.querySelector("[name=body]").value,
        }
        this.props.addPostAction(addPostValues);
    }

    validateHandler = (values) => {
        const errors = {};
        const requiredFields = ["title", "wysiwyg"];

        requiredFields.forEach(field => {
            if (!values[field] || values[field] == "") {
                errors[field] = "This field is required.";
            }
        });

        return errors
    }

    validationShema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        wysiwyg: Yup.string()
            .required('Content is required'),
    })

    render() {
        return (
            <div className="container">
                <Formik
                    onSubmit={this.subimitHandler}
                    validationSchema={this.validationShema}
                    initialValues={{
                        title: '',
                        wysiwyg: ''
                    }}
                >
                    {props => <AddPostForm {...props} />}
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
        addPostAction: (postValues) => dispatch(addPostAction(postValues))
    }
}

export default connect(MapStateToProps, MapDispatchToProps)(AddPost);
