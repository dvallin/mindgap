"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoLocationsRepository = void 0;
const lazy_space_1 = require("lazy-space");
class DynamoLocationsRepository {
    constructor(dynamo) {
        this.dynamo = dynamo;
    }
    list() {
        const params = {
            TableName: process.env.DYNAMODB_TABLE || '',
        };
        return lazy_space_1.Async.of(new Promise((resolve, reject) => this.dynamo.scan(params, (error, result) => (error ? reject(error) : resolve(result.Items)))));
    }
    put(entity, location) {
        const timestamp = new Date().getTime();
        const params = {
            TableName: process.env.DYNAMODB_TABLE || '',
            Item: {
                id: entity,
                json: JSON.stringify(location),
                checked: false,
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        };
        return lazy_space_1.Async.of(new Promise((resolve, reject) => this.dynamo.put(params, (error) => (error ? reject(error) : resolve()))));
    }
}
exports.DynamoLocationsRepository = DynamoLocationsRepository;
//# sourceMappingURL=dynamo-locations-repository.js.map