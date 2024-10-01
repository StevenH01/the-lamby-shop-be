// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({region: 'us-west-2'});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = 'loginTable';

export const addItemHandler = async (event) => {
    // if (event.httpMethod !== 'POST') {
    //     throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    // }
    // All log statements are written to CloudWatch
    console.info('received:', JSON.stringify(event));

    // When testing with Postman or API Gateway, use JSON.parse()
    const isRunningLocally = process.env.AWS_SAM_LOCAL;
    var payload;
    if (isRunningLocally) {
      console.log("isRunningLocally =", isRunningLocally);
      payload = event.body;
    }
    else {
      console.log("isRunningLocally =", isRunningLocally);
      payload = JSON.parse(event.body);
    }
    // When testing with local JSON file, don't use JSON.parse()
    // const payload = event.body;

    // Log payload in CloudWatch for potential issues
    console.info('Logging payload:', JSON.stringify(payload));

    var params = {
        TableName : tableName,
        Item: payload
    };
    console.log("payload=");
    console.log(payload);

    try {
        console.log("PutCommand");
        const data = await ddbDocClient.send(new PutCommand(params));
        var item = data.Item;
        console.log("Success - login added");
      } catch (err) {
        console.log("Error", err.stack);
      }


    const response = {
        statusCode: 200,
        body: JSON.stringify({ userName: payload.userName })
    };

    // All log statements are written to CloudWatch
    console.info(`statusCode: ${response.statusCode}`);
    // console.log(`responseId: ` + responseId);
    console.log(`userName: ` + payload.userName);
    return response;
};