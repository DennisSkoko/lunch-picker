import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Text.module.scss'

function Text ({ children, className, size, ...props }) {
  return (
    <p {...props} className={classNames(className, styles.text, styles[size])}>
      {children}
    </p>
  )
}

Text.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg', 'xl'])
}

Text.defaultProps = {
  children: null,
  className: null,
  size: 'md'
}

export default Text
