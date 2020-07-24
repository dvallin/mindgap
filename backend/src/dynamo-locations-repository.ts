import { DynamoDB } from 'aws-sdk'
import { Async } from 'lazy-space'
import { Location, Entity } from './locations'

export class DynamoLocationsRepository {
  constructor(private readonly dynamo: DynamoDB.DocumentClient) {}

  list(): Async<Record<string, unknown>[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: process.env.DYNAMODB_TABLE || '',
    }
    return Async.of(
      new Promise((resolve, reject) => this.dynamo.scan(params, (error, result) => (error ? reject(error) : resolve(result.Items))))
    )
  }

  put(entity: Entity, location: Location): Async<void> {
    const timestamp = new Date().getTime()
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: process.env.DYNAMODB_TABLE || '',
      Item: {
        id: entity,
        json: JSON.stringify(location),
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    }
    return Async.of(new Promise((resolve, reject) => this.dynamo.put(params, (error) => (error ? reject(error) : resolve()))))
  }
}
