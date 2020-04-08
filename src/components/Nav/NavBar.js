import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import Button from '../Button';

export default class NavBar extends Component {

    render() {

        const containerStyle = {
            height: '100%'
        }
        return (
            <nav className={classes.Nav}>
                <div className="container" style={containerStyle}>
                    <ul className={classes.Navlist}>
                        <li className={classes.Navitem}>
                            <Button text={"Login"}/>
                        </li>
                        <li>
                            <Button text={"Register"}/>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
