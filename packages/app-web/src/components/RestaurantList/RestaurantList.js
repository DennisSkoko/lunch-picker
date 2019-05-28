import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import useRestaurants from '../../hooks/useRestaurants'
import LoadingSpinner from '../LoadingSpinner'
import RestaurantListItem from '../RestaurantListItem'
import styles from './RestaurantList.module.scss'

function RestaurantList ({ className, ...props }) {
  const { loading, data: restaurants } = useRestaurants()

  if (loading) return <LoadingSpinner />
  // TODO: Handle error

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
