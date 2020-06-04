import React, { Component } from 'react'
import ProfileItem from '../components/Profile/ProfileItem';

export default class Profile extends Component {

    render() {

        return (
            <div className="container mt-4">
                <ProfileItem userId={this.props.match.params.userId}></ProfileItem>
            </div>
        )
    }
}
