import React from 'react'
import PropTypes from 'prop-types'
import Text from '../Text'

function RestaurantListItem ({ restaurant, ...props }) {
  return <Text {...props}>{restaurant.name}</Text>
}

RestaurantListItem.propTypes = {
  restaurant: PropTypes
    .shape({
      name: PropTypes.string.isRequired
    })
    .isRequired
}

export default RestaurantListItem
