import { Async, Try, Either } from 'lazy-space'

export type PositionChanged = (position: Either<Position, PositionError>) => void
export interface PositionService {
  current(): Async<Position>
  watch(positionChanged: PositionChanged): Try<number>
  clearWatch(id: number): Try<void>
}

export class WebPositionService implements PositionService {
  current(): Async<Position> {
    if (!navigator.geolocation) {
      return Async.reject(new Error('location api not available'))
    }
    return Async.lift(
      new Promise<Position>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    )
  }

  watch(positionChanged: PositionChanged): Try<number> {
    if (!navigator.geolocation) {
      return Try.failure(new Error('location api not available'))
    }
    return Try.success(
      navigator.geolocation.watchPosition(
        (position) => positionChanged(Either.left(position)),
        (error) => positionChanged(Either.right(error))
      )
    )
  }

  clearWatch(id: number): Try<void> {
    if (!navigator.geolocation) {
      return Try.failure(new Error('location api not available'))
    }
    return Try.success(navigator.geolocation.clearWatch(id))
  }
}
