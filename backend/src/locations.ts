import { APIGatewayProxyHandlerV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { DynamoLocationsRepository } from './dynamo-locations-repository'

export type Entity = string

export interface GeoCoordinates {
  latitude: number
  longitude: number
}

export interface Location {
  coordinates: GeoCoordinates
  data: string
}

export interface LocationComponent {
  entity: Entity
  location: Location
}

const repo = new DynamoLocationsRepository(new DynamoDB.DocumentClient())

export const create: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body || '{}') as LocationComponent
  const result = await repo.put(data.entity, data.location).run()
  return result
    .map<APIGatewayProxyStructuredResultV2>(() => ({
      statusCode: 201,
    }))
    .recover((e) => {
      console.error(e)
      return {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the location item.",
      }
    })
}

export const list: APIGatewayProxyHandlerV2 = async () => {
  const result = await repo.list().run()
  return result
    .map<APIGatewayProxyStructuredResultV2>((items) => ({
      statusCode: 200,
      body: JSON.stringify(items),
    }))
    .recover((e) => {
      console.error(e)
      return {
        statusCode: 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't fetch the locations.",
      }
    })
}
