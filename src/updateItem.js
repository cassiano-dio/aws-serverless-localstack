/**const params = {
        TableName: 'NotalhubDocumentsTable',
        Key: {documentHash},
        UpdateExpression: 'set documentTxHash = :r',
        ExpressionAttributeValues: {
            ':r': documentTxHash,
        },
        ReturnValues: "UPDATED_NEW"
    } */

    'use strict';
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {

    AWS.config.update({
        endpoint: "http://host.docker.internal:4566"
    });

    const dynamo = new AWS.DynamoDB.DocumentClient();

    var message;

    const {id} = event.pathParameters
    const {author} = JSON.parse(event.body)

    const params = {
        TableName: 'Music',
        Key: {"id":id},
        UpdateExpression: 'set author = :a',
        ExpressionAttributeValues: {
            ':a': author,
        },
        ReturnValues: "UPDATED_NEW"
    } 

    try {

        const result = await dynamo.update(params).promise()
        message = result;

    } catch (error) {

        message = error
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
