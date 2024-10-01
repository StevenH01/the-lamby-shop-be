// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand, UpdateCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = 'productTable';

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export const deleteItemHandler = async (event) => {
  // if (event.httpMethod !== 'DELETE') {
  //   throw new Error(`deleteMethod only accept DELETE method, you tried: ${event.httpMethod}`);
  // }
  // All log statements are written to CloudWatch
  console.info('received:', event);
 
  // Retrieve documentNumber from path parameters
  const isRunningLocally = process.env.AWS_SAM_LOCAL;
  var itemName;
  if (isRunningLocally == 'false') {
    itemName = JSON.parse(event.pathParameters.itemName);
  }
  else {
    itemName = event.pathParameters.itemName;
  }
  // Echo the the value of "requestId" from the request header into "responseId"
  // var responseId = event.headerParameters.requestId;

 
  // Get the item from the table
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
  var params = {
    TableName : tableName,
    Key: { itemName: itemName },
  };

  // Delete the item 
  try {
    const data = await ddbDocClient.send(new DeleteCommand(params));
    var item = data.Item;
    console.log("Deleting item...");
    console.log("Successfully deleted item.");
  } catch (err) {
    console.log("Error", err);
  }
 
  const response = {
    statusCode: 200,
    // responseId: responseId,
};
 
  // All log statements are written to CloudWatch
  console.info(`statusCode: ${response.statusCode}`);
  // console.log(`responseId: ` + responseId);
  console.log(`itemName: ` + itemName);
  return response;
}