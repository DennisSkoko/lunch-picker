import useApi from './useApi'

const GET_ALL_QUERY = `
{
  restaurants {
    name
  }
}
`

function useRestaurants () {
  const { loading, data, error } = useApi({ query: GET_ALL_QUERY })
  return { loading, data: data && data.restaurants, error }
}

export default useRestaurants
