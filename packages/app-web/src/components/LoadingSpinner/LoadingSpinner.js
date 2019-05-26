import React from 'react'
import ContentFullscreen from '../ContentFullscreen'
import styles from './LoadingSpinner.module.scss'

function LoadingSpinner () {
  return (
    <ContentFullscreen>
      <div className={styles.spinner}>
        <div />
        <div />
        <div />
      </div>
    </ContentFullscreen>
  )
}

export default LoadingSpinner
