import React from 'react'
import useRestaurants from '../Restaurants'
import PickerSimple from '../PickerSimple'

function RestaurantPicker () {
  const [{ restaurants }] = useRestaurants()
  return <PickerSimple items={restaurants.map(restaurant => restaurant.name)} />
}

export default RestaurantPicker
