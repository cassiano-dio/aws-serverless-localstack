'use strict';
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {

    AWS.config.update({
        endpoint: "http://host.docker.internal:4566"
    });

    const dynamo = new AWS.DynamoDB.DocumentClient();

    var message;
    var params = {
        
        TableName: "Movies",
        Key: {"year":1980, "title":"1942"}
    };


    try {

        const result = await dynamo.get(params).promise()
        message = result.Item;

    } catch (error) {

        message = error
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
