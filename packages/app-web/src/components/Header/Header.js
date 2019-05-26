import React from 'react'
import { ReactComponent as MenuSvg } from '../../res/menu.svg'
import HeaderBar from '../HeaderBar'
import HeaderBarItem from '../HeaderBarItem'
import styles from './Header.module.scss'

function Header () {
  return (
    <HeaderBar>
      <HeaderBarItem>
        <MenuSvg className={styles.icon} />
      </HeaderBarItem>
    </HeaderBar>
  )
}

export default Header
