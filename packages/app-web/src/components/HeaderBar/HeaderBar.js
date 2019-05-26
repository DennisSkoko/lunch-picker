import React from 'react'
import PropTypes from 'prop-types'
import styles from './HeaderBar.module.scss'

function HeaderBar ({ children }) {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.menu}>
          {children}
        </ul>
      </nav>
    </header>
  )
}

HeaderBar.propTypes = {
  children: PropTypes.node
}

HeaderBar.defaultProps = {
  children: null
}

export default HeaderBar
