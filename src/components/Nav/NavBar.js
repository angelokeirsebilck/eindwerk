import React, { Component } from 'react'
import classes from './NavBar.module.css';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';

class NavBar extends Component {

    render() {
        const containerStyle = {
            height: '100%',
            display: 'flex'
        }

        let isLoggedIn = false;

        if (this.props.user != undefined) {
            isLoggedIn = true;
        }

        return (
            <nav className={classes.Nav}>
                <div className="container" style={containerStyle}>
                    <Link to="/" className={classes.HomeLink}>HOME</Link>
                    {isLoggedIn ?
                        <ul className={classes.Navlist}>
                            <li className={classes.Navitem}>
                                <button onClick={this.props.logoutAction}>Logout</button>
                            </li>
                            <li>
                                <Button text={"Profile"} link={"/profile"} />
                            </li>
                        </ul>
                        :
                        <ul className={classes.Navlist}>
                            <li className={classes.Navitem}>
                                <Button text={"Login"} link={"/login"} />
                            </li>
                            <li>
                                <Button text={"Register"} link={"/register"} />
                            </li>
                        </ul>}
                </div>
            </nav>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const MapDispatchToProps = (dispatch) => {
    return {
      logoutAction: () => dispatch(logoutAction())
    }
  }

export default connect(MapStateToProps, MapDispatchToProps)(NavBar);

