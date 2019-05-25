import React from 'react'
import 'normalize.css'
import useRestaurants from '../../hooks/useRestaurants'
import ErrorMessage from '../ErrorMessage'
import LoadingSpinner from '../LoadingSpinner'
import PickerSimple from '../PickerSimple'

function App () {
  const { loading, data: restaurants, error } = useRestaurants()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />

  return <PickerSimple items={restaurants.map(restaurant => restaurant.name)} />
}

export default App
