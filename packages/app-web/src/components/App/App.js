import React from 'react'
import useRestaurants from '../../hooks/useRestaurants'
import ErrorMessage from '../ErrorMessage'
import Header from '../Header'
import LoadingSpinner from '../LoadingSpinner'
import PickerSimple from '../PickerSimple'

function App () {
  const { loading, data: restaurants, error } = useRestaurants()

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage />

  return (
    <>
      <Header />
      <PickerSimple items={restaurants.map(restaurant => restaurant.name)} />
    </>
  )
}

export default App
