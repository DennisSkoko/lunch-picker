import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './ContentFullscreen.module.css'

function ContentFullscreen ({ children, className }) {
  return (
    <div className={classNames(className, styles.wrapper)}>
      {children}
    </div>
  )
}

ContentFullscreen.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

ContentFullscreen.propTypes = {
  children: null,
  className: null
}

export default ContentFullscreen
