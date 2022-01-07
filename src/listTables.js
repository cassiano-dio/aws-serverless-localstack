'use strict';
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {

    AWS.config.update({
        endpoint: "http://host.docker.internal:4566"
    });
    
    const dynamo = new AWS.DynamoDB();

    var message;

    try {

        const data = await dynamo.listTables().promise();
        message = data;

    } catch (error) {

        message = error
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
