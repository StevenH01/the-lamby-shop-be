import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(client);

const tableName = 'loginTable';

export const updateItemHandler = async (event) => {
    console.info('received:', event);

    // Determine if running locally
    const isRunningLocally = process.env.AWS_SAM_LOCAL;
    let email;
    let payload;

    if (isRunningLocally) {
        console.log("isRunningLocally =", isRunningLocally);
        email = event.pathParameters.email;
        payload = event.body;
    } else {
        console.log("isRunningLocally =", isRunningLocally);
        email = event.pathParameters.email;
        payload = JSON.parse(event.body);
    }

    // Ensure the primary key is included
    // const email = email; // Assuming 'email' is the primary key (partition key)

    // Extract the fields to update
    const { password } = payload; // Add other fields as necessary

    // Define the UpdateExpression and ExpressionAttributeValues
    const params = {
        TableName: tableName,
        Key: { email }, // Replace 'itemName' with your actual primary key name
        UpdateExpression: 'SET #password = :password',
        ExpressionAttributeNames: {
            '#password': 'password', // Use ExpressionAttributeNames for attribute names that are reserved words
        },
        ExpressionAttributeValues: {
            ':password': password,
        },
        ReturnValues: 'ALL_NEW', // Optionally, get the updated item back
    };

    try {
        console.log("Updating login...");
        const data = await ddbDocClient.send(new UpdateCommand(params));
        console.log("Login updated:", data);
    } catch (err) {
        console.log("Error", err.stack);
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: err.message })
        };
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
        body: JSON.stringify({ message: 'Item updated successfully' })
    };
};
