'use strict';
const AWS = require("aws-sdk");
const fs = require('fs');
module.exports.handler = async (event) => {

    let dataFile = fs.readFileSync('./data/put-data.json');

    var data = JSON.parse(dataFile)

    const {id, year, title, author} = JSON.parse(event.body)

    console.log(year)

    AWS.config.update({
        endpoint: "http://host.docker.internal:4566"
    });

    const dynamo = new AWS.DynamoDB.DocumentClient();

    var message;
    var newItem = {
        "id": id,
        "year": year,
        "title":title,
        "author":author
    };

    try {

        await dynamo.put({
            "TableName": "Music",
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
