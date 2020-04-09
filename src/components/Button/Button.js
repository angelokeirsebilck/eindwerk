import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';
import { Link } from 'react-router-dom';

export default class Button extends Component {

    render() {
        const { text, link } = this.props;
        return (
            <Link to={link} className={classes.Button}>
                {text}
            </Link>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};
