import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Sidebar.module.scss'

function Sidebar ({ active, children, onClose }) {
  const handleClick = () => {
    if (onClose) onClose()
  }

  return (
    <>
      <div
        className={classNames(styles.dimmer, {
          [styles.active]: active
        })}
        onClick={handleClick}
      />

      <aside
        className={classNames(styles.sidebar, {
          [styles.active]: active
        })}
      >
        {children}
      </aside>
    </>
  )
}

Sidebar.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func
}

Sidebar.defaultProps = {
  children: null,
  onClose: null
}

export default Sidebar
