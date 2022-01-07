"use strict";
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {

    AWS.config.update({
        endpoint: "http://host.docker.internal:4566",
        region: 'us-east-1'
    });
    
    const dynamo = new AWS.DynamoDB({region: 'us-east-1'});

    var message;
    var data;


    try {
        data = await dynamo.scan({ TableName: "Movies" }).promise();
        message = data.Items;
    } catch (error) {
        message = error;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
