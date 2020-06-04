import React, { Component } from 'react'
import classes from './NavBar.module.css';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { logoutAction } from '../../redux/actions/authActions';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Nav.css';

class NavBar extends Component {

    onHamburgerClickHandler = () => {
        let hamburger = $('#hamburger');
        let mobileBody = $('.Nav_mobile_body');
        let body = $('body');
        hamburger.toggleClass("open");
        mobileBody.toggleClass("open");
        body.toggleClass("open");
    }

    render() {
        const containerStyle = {
            height: '100%',
            display: 'flex'
        }

        const containerStyleHeight = {
            height: '100%'
        }

        let isLoggedIn = false;

        if (this.props.user != undefined ) {
            isLoggedIn = true;
        }

        return (
            <nav className={classes.Nav}>
                <div className="container" style={containerStyle}>

                    <Link to="/" className={classes.Home_link}>HOME</Link>
                    {isLoggedIn ?
                        <ul className={classes.Nav_list}>
                            <li className={classes.Nav_item}>
                                <Button text={"Register"} link={"/register"} />
                            </li>
                            <li className={classes.Nav_item_dropdown}>
                                <img className={classes.Nav_image} src={this.props.user.avatar} alt="" />
                                <div className={classes.Nav_dropdown}>
                                    <Button text={"AddPost"} link={"/addpost"} />
                                    <button className={classes.Button_primary} onClick={this.props.logoutAction}>Logout</button>
                                </div>
                            </li>
                            <li className={classes.Nav_mobile}>
                                <div id="hamburger" onClick={this.onHamburgerClickHandler} className="Nav_hamburger">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </li>
                        </ul>
                        :
                        <ul className={classes.Nav_list}>
                            <li className={classes.Nav_item}>
                                <Button text={"Register"} link={"/register"} />
                            </li>
                            <li className={classes.Nav_item}>
                                <Button text={"Login"} link={"/login"} />
                            </li>
                            <li className={classes.Nav_mobile}>
                                <div id="hamburger" onClick={this.onHamburgerClickHandler} className="Nav_hamburger">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </li>
                        </ul>}
                </div>
                <div className="Nav_mobile_body">
                    <div className="container" style={containerStyleHeight}>
                        {isLoggedIn ?
                            <ul className={classes.Nav_mobile_list}>
                                <li className={classes.Nav_mobile_item}>
                                    <Button text={"Register"} mobile={true} link={"/register"} />
                                </li>
                                <li><Button text={"AddPost"} mobile={true} link={"/addpost"} /></li>
                                <li><button className={classes.Button_mobile} onClick={this.props.logoutAction}>Logout</button></li>
                            </ul>
                            :
                            <ul className={classes.Nav_mobile_list}>
                                <li className={classes.Navitem}>
                                    <Button mobile={true} text={"Register"} link={"/register"} />
                                </li>
                                <li className={classes.Navitem}>
                                    <Button mobile={true} text={"Login"} link={"/login"} />
                                </li>
                            </ul>}
                    </div>
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

