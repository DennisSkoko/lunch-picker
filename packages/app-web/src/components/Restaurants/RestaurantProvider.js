import React from 'react'
import PropTypes from 'prop-types'
import useApi from '../../hooks/useApi'
import RestaurantContext from './RestaurantContext'

const GET_ALL_QUERY = `
{
  restaurants {
    name
  }
}
`

function RestaurantProvider ({ children }) {
  const { loading, data, error } = useApi({ query: GET_ALL_QUERY })
  const result = [{ loading, error, restaurants: data && data.restaurants }]

  return (
    <RestaurantContext.Provider value={result}>
      {children(result)}
    </RestaurantContext.Provider>
  )
}

RestaurantProvider.propTypes = {
  children: PropTypes.func.isRequired
}

export default RestaurantProvider
