import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';
import { Link } from 'react-router-dom';

export default class Button extends Component {

    render() {
        const { text, link, mobile } = this.props;

        let btnClass = [];
        btnClass.push(classes.Button);

        if(mobile){
            btnClass.push(classes.Button_mobile);
        }
        return (
            <Link to={link}  className={btnClass.join(' ')}>
                {text}
            </Link>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    mobile: PropTypes.bool
};
