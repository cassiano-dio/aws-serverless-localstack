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
        endpoint: "http://localhost:4566"
    });

    const dynamo = new AWS.DynamoDB.DocumentClient();

    var message;

    var actor = "Miranha";

    const params = {
        TableName: 'Movies',
        Key: {
            "year":2021,
            "title":"Miranha Limpando a Casa"
        },
        UpdateExpression: 'set actor = :a',
        ExpressionAttributeValues: {
            ':a': actor,
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
