import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Text.module.css'

function Text ({ children, className }) {
  return (
    <p className={classNames(className, styles.text)}>
      {children}
    </p>
  )
}

Text.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

Text.propTypes = {
  children: null,
  className: null
}

export default Text
