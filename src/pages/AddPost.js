import React, { Component } from 'react'
import { Formik } from 'formik'
import AddPostForm from '../components/Forms/AddPostForm'
import { addPostAction } from '../redux/actions/postsActions'
import { connect } from 'react-redux'

class AddPost extends Component {

    subimitHandler = (values) => {
        const addPostValues = {
            "title":  document.querySelector("[name=title]").value,
            "body": document.querySelector("[name=body]").value,
        }
        this.props.addPostAction(addPostValues);
    }

    validateHandler = (values) => {
        const errors = {};

        const requiredFields = ["title","body"];

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
                        title: '',
                        body: ''
                    }}
                >
                    <AddPostForm />
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
        addPostAction: (postValues) => dispatch( addPostAction(postValues))
    }
}

export default connect(MapStateToProps,MapDispatchToProps)(AddPost);
