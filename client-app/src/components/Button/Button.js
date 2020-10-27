import React, { Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = () =>{
  const { className, outlined, squared, children, ...rest } = props;

    return(
            <button >
                {children}
            </button>
    )
}

export default Button