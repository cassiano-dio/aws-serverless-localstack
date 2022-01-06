'use strict';
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {

    AWS.config.update({
        endpoint: "http://localhost:4566"
    });

    const dynamo = new AWS.DynamoDB.DocumentClient();

    var message;
    var params = {
        
        TableName: "Movies",
        Key: {"year":2020, "title":"1917"}
    };


    try {

        const result = await dynamo.get(params).promise()
        message = result;

    } catch (error) {

        message = error
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
