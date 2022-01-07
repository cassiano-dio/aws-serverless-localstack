'use strict';
const AWS = require("aws-sdk");

module.exports.handler = async (event) => {
    
    AWS.config.update({
        endpoint: "http://host.docker.internal:4566"
    });

    const dynamo = new AWS.DynamoDB();

    var message;

    var params = {
        TableName : "Music",
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "S" }
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
