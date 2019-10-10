import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import RestaurantListItem from '../RestaurantListItem'
import useRestaurants from '../Restaurants'
import styles from './RestaurantList.module.scss'

function RestaurantList ({ className, ...props }) {
  const [{ restaurants }] = useRestaurants()

  return (
    <ul {...props} className={classNames(className, styles.list)}>
      {restaurants.map(restaurant => (
        <li key={restaurant.name} className={styles.item}>
          <RestaurantListItem restaurant={restaurant} />
        </li>
      ))}
    </ul>
  )
}

RestaurantList.propTypes = {
  className: PropTypes.string
}

RestaurantList.defaultProps = {
  className: null
}

export default RestaurantList
