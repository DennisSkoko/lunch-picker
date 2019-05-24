import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Button.module.css'

function Button ({ children, className, ...props }) {
  return (
    <button className={classNames(className, styles.button)} {...props}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Button.defaultProps = {
  children: null,
  className: null
}

export default Button
