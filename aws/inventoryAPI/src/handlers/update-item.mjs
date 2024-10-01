// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({region: 'us-west-2'});
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = 'productTable';

export const updateItemHandler = async (event) => {
    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Retrieve documentNumber from path parameters
    const isRunningLocally = process.env.AWS_SAM_LOCAL;
    var itemName;
    var payload;
    if (isRunningLocally) {
      console.log("isRunningLocally =", isRunningLocally);
      itemName = event.pathParameters.itemName;
      payload = event.body;
    }
    else {
      console.log("isRunningLocally =", isRunningLocally);
      itemName = event.pathParameters.itemName;
      payload = JSON.parse(event.body);
    }
    var itemName = {
        "itemName": itemName
      };

    // Retrieve the updated payload
    // When testing locally, do not include JSON.parse()
    // When testing with API Gatway or Postman, use JSON.parse()
    const updatedPayload = {
        ...itemName,
        ...payload
    }
    console.log(updatedPayload);

    // Initialize the errors
    var error = "N/A";

    var params = {
        TableName : tableName,
        Item: updatedPayload
    };

    try {
        console.log("Updating item...");
        const data = await ddbDocClient.send(new PutCommand(params));
        var item = data.Item;
        console.log("Item updated.", data);
      } catch (err) {
        error = err.stack;
        console.log("Error", err.stack);
      }

    // Create an error array
    var errorArray = {
        error: error,
        message: error
    };

    const response = {
        statusCode: 200,
        // responseId: responseId,
        // documentNumber: retrievedNumber,
        // error: errorArray
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName: itemName, errors: errorArray })
    };

    // All log statements are written to CloudWatch
    console.info(`statusCode: ${response.statusCode}`);
    // console.log(`responseId: ` + responseId);
    console.log(`itemName: ` + itemName);
    console.log(`errors: ` + JSON.stringify(errorArray));
    return response;
};