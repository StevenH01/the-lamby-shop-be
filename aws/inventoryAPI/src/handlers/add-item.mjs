// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({region: 'us-west-2'});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// Get the DynamoDB table name from environment variables
const tableName = 'productTable';

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
    payload.itemName = decodeURIComponent(payload.itemName);
    console.log("decodedURI Name= ", payload.itemName);
    // try {
    //   var bucket = process.env.S3_BUCKET;
    //   var portraitkey = calculatedNumber + "_portrait.txt";
    //   var idImageBackKey = calculatedNumber + "_idImageBack.txt";
    //   var idImageFrontKey = calculatedNumber + "_idImageFront.txt";
       
    //   var putPortraitResponse = await putObject(bucket,portraitkey,payload.portrait);
    //   var putIdImageBackResponse = await putObject(bucket, idImageBackKey,payload.idImageBack);
    //   var putIdImageFrontResponse = await putObject(bucket, idImageFrontKey,payload.idImageFront);
      
    //   console.log("putPortraitResponse", putPortraitResponse);
    //   console.log("putIdImageBackResponse", putIdImageBackResponse);
    //   console.log("putIdImageFrontResponse", putIdImageFrontResponse);
      
    // } catch (err) {
    //     console.log("Error: ", err);
    // }
    // payload.documentNumber = calculatedNumber;
    // payload.portrait = portraitkey;
    // payload.idImageBack = idImageBackKey;
    // payload.idImageFront = idImageFrontKey;
    
    /*
    const updatedPayload = {
        ...payloadToUpdate,
        ...payload
    }
  
    */
    
    // Creates a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
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
        console.log("Success - item added");
      } catch (err) {
        console.log("Error", err.stack);
      }


    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",  // Allow all domains, or specify your domain here
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",  // Specify the allowed methods
        },
        body: JSON.stringify({ itemName: payload.itemName })
    };

    // All log statements are written to CloudWatch
    console.info(`statusCode: ${response.statusCode}`);
    // console.log(`responseId: ` + responseId);
    console.log(`itemName: ` + payload.itemName);
    return response;
};