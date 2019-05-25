import { useEffect, useReducer } from 'react'
import fetch from './fetch'
import reducer, { SET_ERROR, SET_DATA } from './reducer'

function checkStatus (res) {
  if (!res.ok) {
    const err = new Error(res.statusText)
    err.response = res
    throw err
  }

  return res
}

function useApi ({ query, data }) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    data: null,
    error: null
  })

  useEffect(() => {
    fetch({ query, data })
      .then(checkStatus)
      .then(res => res.json())
      .then(res => {
        dispatch({ type: SET_DATA, data: res.data })
      })
      .catch(err => {
        dispatch({ type: SET_ERROR, error: err })
      })
  }, [query, data])

  return state
}

export default useApi
