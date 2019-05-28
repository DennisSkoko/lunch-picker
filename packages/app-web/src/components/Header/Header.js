import React, { useState } from 'react'
import { ReactComponent as MenuSvg } from '../../res/menu.svg'
import HeaderBar from '../HeaderBar'
import HeaderBarItem from '../HeaderBarItem'
import Sidebar from '../Sidebar'
import RestaurantList from '../RestaurantList'
import styles from './Header.module.scss'

function Header () {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <HeaderBar>
        <HeaderBarItem onClick={() => { setShowSidebar(true) }}>
          <MenuSvg className={styles.icon} />
        </HeaderBarItem>
      </HeaderBar>

      <Sidebar
        active={showSidebar}
        onClose={() => setShowSidebar(false)}
      >
        <RestaurantList />
      </Sidebar>
    </>
  )
}

export default Header
