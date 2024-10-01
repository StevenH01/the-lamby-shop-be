// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = 'productTable';

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
export const getItemHandler = async (event) => {
  // if (event.httpMethod !== 'GET') {
  //   throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  // }
  // All log statements are written to CloudWatch
  console.info('received:', event);
  
  // Retrieve documentNumber from path parameters
  const isRunningLocally = process.env.AWS_SAM_LOCAL;
  var itemName;
  if (isRunningLocally == 'false') {
    console.log("Called via API");
    itemName = JSON.parse(event.pathParameters.itemName);
  }
  else {
    console.log("Called via locally");
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

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    var item = data.Item;
    
  } catch (err) {
    console.log("Error", err);
  }
 
  const response = {
    statusCode: 200,
    body: JSON.stringify(item)
  };
 
  // All log statements are written to CloudWatch
//   console.info(`statusCode: ${response.statusCode}`);
  // console.log(`responseId: ` + responseId);
  console.log(`itemName: ` + itemName);
  return response;
}
