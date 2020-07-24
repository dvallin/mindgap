"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.create = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamo_locations_repository_1 = require("./dynamo-locations-repository");
const repo = new dynamo_locations_repository_1.DynamoLocationsRepository(new aws_sdk_1.DynamoDB.DocumentClient());
exports.create = async (event) => {
    const data = JSON.parse(event.body || '{}');
    const result = await repo.put(data.entity, data.location).run();
    return result
        .map(() => ({
        statusCode: 201,
    }))
        .recover((e) => {
        console.error(e);
        return {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: "Couldn't create the location item.",
        };
    });
};
exports.list = async () => {
    const result = await repo.list().run();
    return result
        .map((items) => ({
        statusCode: 200,
        body: JSON.stringify(items),
    }))
        .recover((e) => {
        console.error(e);
        return {
            statusCode: 501,
            headers: { 'Content-Type': 'text/plain' },
            body: "Couldn't fetch the locations.",
        };
    });
};
//# sourceMappingURL=locations.js.map