"use strict";
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {

    AWS.config.update({
        endpoint: "http://localhost:4566",
    });
    
    const dynamo = new AWS.DynamoDB();

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
