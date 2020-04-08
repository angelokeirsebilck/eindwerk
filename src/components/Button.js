import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';

export default class Button extends Component {

    render() {
        const { text } = this.props;
        return (
            <button className={classes.Button}>
                {text}
            </button>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired
};
