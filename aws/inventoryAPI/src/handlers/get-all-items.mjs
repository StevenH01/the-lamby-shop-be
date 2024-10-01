// Create clients and set shared const values outside of the handler.
// Create a DocumentClient that represents the query to add an item
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
// Get the DynamoDB table name from environment variables
const tableName = 'productTable';
const s3Client = new S3Client({ region: 'us-west-2' });  
const bucketName = 'thelambyshop-images';
/**
 * A simple example includes a HTTP get method to get all items from a DynamoDB table.
 */
 
// A function to generate a signed url for the s3 images
const generateSignedUrl = async (s3Key) => {
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: s3Key,
    });

    try {
        // Generate a signed URL with expiration time (1 hour in this example)
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return signedUrl;
    } catch (err) {
        console.log("Error generating signed URL", err);
        return null;  // Return null if there's an error generating the signed URL
    }
};

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
        
        // Retrieve images
        console.log("Getting signedUrls");
        for (let item of items) {
            if (item.imageKey) {  
                const signedUrl = await generateSignedUrl(item.imageKey);
                // console.log("signedUrl=", signedUrl);
                item.signedUrl = signedUrl;  // Attach the signed URL to the item
            }
            // console.log("imageKey=",item.imageKey);
        }

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