import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Text from '../Text'
import styles from './RestaurantListItem.module.scss'

function RestaurantListItem ({ restaurant, className, ...props }) {
  return <Text>{restaurant.name}</Text>
}

RestaurantListItem.propTypes = {
  restaurant: PropTypes
    .shape({
      name: PropTypes.string.isRequired
    })
    .isRequired
}

export default RestaurantListItem
