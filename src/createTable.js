'use strict';
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {
    
    AWS.config.update({
        endpoint: "http://host.docker.internal:4566"
    });

    const dynamo = new AWS.DynamoDB();

    var message;

    var params = {
        TableName : "Movies",
        KeySchema: [       
            { AttributeName: "year", KeyType: "HASH"},  //Partition key
            { AttributeName: "title", KeyType: "RANGE" }  //Sort key
        ],
        AttributeDefinitions: [       
            { AttributeName: "year", AttributeType: "N" },
            { AttributeName: "title", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    try {

        const result = await dynamo.createTable(params).promise()
        console.log(result)
        message = result;

    } catch (error) {

        message = error
    }

    return {
        statusCode: 200,
        body: JSON.stringify(message),
    };

};
