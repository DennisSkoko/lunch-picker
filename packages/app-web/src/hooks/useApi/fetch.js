function fetch (body) {
  return window.fetch(process.env.REACT_APP_API_URL, {
    method: 'POST',
    headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
    body: JSON.stringify(body)
  })
}

export default fetch
