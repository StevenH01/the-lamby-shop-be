// Create clients and set shared const values outside of the handler.
// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
// Get the DynamoDB table name from environment variables
const tableName = 'loginTable';
/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */

export const getAllItemsHandler = async (event) => {
    // if (event.httpMethod !== 'GET') {
    //     throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    // }
    // All log statements are written to CloudWatch
    console.info('received:', event);

    var params = {
        TableName : tableName,
    };

    try {
        const data = await ddbDocClient.send(new ScanCommand(params));
        var items = data.Items;

    } catch (err) {
        console.log("Error", err);
    }

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",  // Allow all domains, or specify your domain here
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",  // Specify the allowed methods
        },
        body: JSON.stringify(items)
    };

    // All log statements are written to CloudWatch
    console.info(`statusCode: ${response.statusCode}`);
    // console.log(`responseId: ` + responseId);
    return response;
}