import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = 'subscriptionTable';

export const addEmailHandler = async (event) => {
    console.info('received:', JSON.stringify(event));

    const isRunningLocally = process.env.AWS_SAM_LOCAL;
    let payload;
    if (isRunningLocally) {
        console.log("isRunningLocally =", isRunningLocally);
        payload = event.body;
    } else {
        console.log("isRunningLocally =", isRunningLocally);
        payload = JSON.parse(event.body);
    }

    console.info('Logging payload:', JSON.stringify(payload));

    try {
        // Check if the email already exists
        const scanParams = {
            TableName: tableName,
            FilterExpression: 'email = :email',
            ExpressionAttributeValues: { ':email': payload.email }
        };

        console.log("Checking if email already exists");
        const scanResult = await ddbDocClient.send(new ScanCommand(scanParams));

        if (scanResult.Items && scanResult.Items.length > 0) {
            // Email already exists
            console.log("Email already exists, skipping insert");
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                },
                body: JSON.stringify({ message: "Email already exists" })
            };
        }

        // If email does not exist, add it to the table
        const putParams = {
            TableName: tableName,
            Item: payload
        };

        console.log("Adding email to the table");
        await ddbDocClient.send(new PutCommand(putParams));
        console.log("Success - email added");

        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            },
            body: JSON.stringify({ message: "Email added successfully", email: payload.email })
        };

        console.info(`statusCode: ${response.statusCode}`);
        return response;

    } catch (err) {
        console.error("Error", err.stack);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred", error: err.message })
        };
    }
};
