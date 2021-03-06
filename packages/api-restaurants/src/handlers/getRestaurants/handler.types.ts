export type GeoLocation = { latitude: number, longitude: number }

export type Price = 0|1|2|3|4

export type GcpPlacesRestaurant = {
  place_id: string
  name: string
  vicinity: string
  rating: number
  user_ratings_total: number
  price_level: number
}

export type GcpPlacesApiResponseBody = {
  next_page_token?: string
  results: GcpPlacesRestaurant[]
}

export type Restaurant = {
  id: string
  name: string
  address: string
  price: { level: number }
  rating: { reviewsCount: number, level: number }
}

export type Filter = {
  price?: { min?: Price, max?: Price }
  openNow?: boolean
  radius?: number
}

export type Event = {
  geoLocation: GeoLocation
  filter?: Filter
  pageToken?: string
}

export type Result = {
  items: Restaurant[]
  pageToken?: string
}
