import { GeoCoordinates } from '../map/state'
import { Async } from 'lazy-space'

export interface GeocodingService {
  getDisplayName(coordinates: GeoCoordinates): Async<string>
}

export class Nominatim implements GeocodingService {
  getDisplayName(coordinates: GeoCoordinates): Async<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
    return Async.lift(fetch(url))
      .liftMap((a) => a.json())
      .map((a) => a.display_name)
  }
}
