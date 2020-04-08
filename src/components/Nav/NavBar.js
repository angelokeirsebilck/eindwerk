import React, { Component } from 'react'
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
                            <Button text={"Login"} link={"/login"}/>
                        </li>
                        <li>
                            <Button text={"Register"} link={"/register"}/>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
