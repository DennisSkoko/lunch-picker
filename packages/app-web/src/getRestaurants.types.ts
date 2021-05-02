export type GeoLocation = {
  latitude: number
  longitude: number
}

export type Price = 0|1|2|3|4

export type Filter = {
  price?: { min?: Price, max?: Price }
  openNow?: boolean
  radius?: number
}

export type Restaurant = {
  id: string
  name: string
  address: string
  price: {
    level?: number
  }
  rating: {
    reviewsCount: number
    level: number
  }
}

export type ApiResponse = {
  data: {
    restaurants: {
      pageToken?: string
      items: Restaurant[]
    }
  }
}

export type GetRestaurantsParams = {
  geoLocation: GeoLocation
  filter?: Filter
}
