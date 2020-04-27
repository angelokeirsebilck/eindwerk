import React, { Component } from 'react'
import { Formik } from 'formik'
import AddPostForm from '../components/Forms/AddPostForm'
import { addPostAction } from '../redux/actions/postsActions'
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { API } from '../config/API';

class AddPost extends Component {

    onAddPostHandler = (values) => {
        const addPostValues = {
            "title": values.title,
            "body": values.body
        }
        this.addPostAction(addPostValues);
        this.props.history.push("/");
    }

    addPostAction = (postValues) => {
        API.post("api/posts", postValues).then(response => {

        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    validationShema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        body: Yup.string()
            .required('Content is required'),
    })

    render() {
        return (
            <div className="container">
                <Formik
                    onSubmit={this.onAddPostHandler}
                    validationSchema={this.validationShema}
                    initialValues={{
                        title: '',
                        body: ''
                    }}
                    render={props =>
                        <AddPostForm  {...props} buttonValue="add post" />
                    }
                >
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
        // addPostAction: (postValues) => dispatch(addPostAction(postValues))
    }
}

export default withRouter(connect(MapStateToProps, MapDispatchToProps)(AddPost));
