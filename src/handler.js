'use strict';
const AWS = require("aws-sdk");

module.exports.hello = async (event) => {

  AWS.config.update({
    endpoint: "http://localhost:4566"
});

var message;
var data;

const dynamo = new AWS.DynamoDB();

  var params = {
    TableName : "MusicAlbums",
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
  
  await dynamo.createTable(params).promise()

  data = await dynamo.listTables().promise();

  await dynamo.putItem({
    "TableName": "Movies",
    "Item": {
        "year": {"N": "2020"},
        "title": {"S": "1917"}
    }
  }).promise()

  try {

    data = await dynamo.scan({ TableName: "Movies" }).promise()
    message = data.Items;

  } catch (error) {

    message = error
  }

  return {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
