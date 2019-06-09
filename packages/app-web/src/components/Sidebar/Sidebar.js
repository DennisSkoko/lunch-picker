import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { ReactComponent as CloseSvg } from '../../res/close.svg'
import styles from './Sidebar.module.scss'

function Sidebar ({ active, children, onClose }) {
  const handleClick = () => {
    if (onClose) onClose()
  }

  const handleKeyDown = event => {
    if (onClose && event.key === 'Escape') onClose()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => { window.removeEventListener('keydown', handleKeyDown) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className={classNames(styles.dimmer, {
          [styles.active]: active
        })}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role='button'
        tabIndex='0'
      />

      <aside
        className={classNames(styles.sidebar, {
          [styles.active]: active
        })}
      >
        <div className={styles.close}>
          <button onClick={onClose}>
            <CloseSvg />
          </button>
        </div>

        {children}

        <div className={styles.spacing} />
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
