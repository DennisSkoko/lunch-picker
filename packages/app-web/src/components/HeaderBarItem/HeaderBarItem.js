import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './HeaderBarItem.module.scss'

function HeaderBarItem ({ children, className, onClick, ...props }) {
  return (
    <li {...props}>
      <button
        className={classNames(className, styles.button)}
        onClick={onClick}
      >
        {children}
      </button>
    </li>
  )
}

HeaderBarItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
}

HeaderBarItem.defaultProps = {
  children: null,
  className: null,
  onClick: null
}

export default HeaderBarItem
