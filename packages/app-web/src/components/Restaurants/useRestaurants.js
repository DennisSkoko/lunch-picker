import { useContext } from 'react'
import RestaurantContext from './RestaurantContext'

function useRestaurants () {
  return useContext(RestaurantContext)
}

export default useRestaurants
