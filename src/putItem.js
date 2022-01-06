'use strict';
const AWS = require("aws-sdk");
const fs = require('fs');
module.exports.handler = async (event) => {

    let dataFile = fs.readFileSync('./data.json');

    var data = JSON.parse(dataFile)

    AWS.config.update({
        endpoint: "http://localhost:4566"
    });

    const dynamo = new AWS.DynamoDB.DocumentClient();

    var message;
    var newItem = {
        "year": data.year,
        "title": data.title,
        "soundtrack":data.soundtrack
    };

    try {

        await dynamo.put({
            "TableName": "Movies",
            "Item": newItem
        }).promise()
        message = newItem;

    } catch (error) {

        message = error
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
