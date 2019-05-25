const SET_DATA = 'set-data'
const SET_ERROR = 'set-error'
const SET_LOADING = 'set-loading'

function reducer (state, action) {
  switch (action.type) {
    case SET_DATA:
      return { loading: false, data: action.data, error: null }

    case SET_ERROR:
      return { lading: false, data: null, error: action.error }

    case SET_LOADING:
      return { loading: true, data: null, error: null }

    default:
      return state
  }
}

export default reducer
export { SET_DATA, SET_ERROR, SET_LOADING }
