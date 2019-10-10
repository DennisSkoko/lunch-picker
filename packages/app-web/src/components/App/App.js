import React from 'react'
import ErrorMessage from '../ErrorMessage'
import Header from '../Header'
import LoadingSpinner from '../LoadingSpinner'
import RestaurantPicker from '../RestaurantPicker'
import { RestaurantProvider } from '../Restaurants'

function App () {
  return (
    <RestaurantProvider>
      {([{ loading, error, restaurants }]) => (
        <>
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage />}

          {restaurants && (
            <>
              <Header />
              <RestaurantPicker />
            </>
          )}
        </>
      )}
    </RestaurantProvider>
  )
}

export default App
