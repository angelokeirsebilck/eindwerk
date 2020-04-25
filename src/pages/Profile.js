import React, { Component } from 'react'
import { API } from "../config/API";

export default class Profile extends Component {

    state = {
        user: []
    }

    componentDidMount(){
        this.loadUser();
    }

    loadUser = () => {
        API.get("api/users/" + this.props.match.params.userId).then(response => {
            this.setState({
                user: response.data
            })
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {
        let user = this.state.user;
        return (
            <div>
                {user.first_name}
            </div>
        )
    }
}
