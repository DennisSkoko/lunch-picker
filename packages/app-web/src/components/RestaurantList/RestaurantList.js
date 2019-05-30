import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import RestaurantListItem from '../RestaurantListItem'
import styles from './RestaurantList.module.scss'

function RestaurantList ({ className, restaurants, ...props }) {
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
  className: PropTypes.string,
  restaurants: PropTypes
    .arrayOf(RestaurantListItem.propTypes.restaurant)
    .isRequired
}

RestaurantList.defaultProps = {
  className: null
}

export default RestaurantList
