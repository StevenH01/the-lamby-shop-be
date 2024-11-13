import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ddbClient = new DynamoDBClient({ region: 'us-west-2' });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
const sesClient = new SESClient({ region: 'us-west-2' });

const tableName = 'subscriptionTable'; // DynamoDB table storing subscriber emails

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const sendAllEmailsHandler = async (event) => {
    try {
        const { subject, body } = JSON.parse(event.body);
        // const { subject, body } = event.body;

        if (!subject || !body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Subject and body are required." }),
            };
        }

        const footer = "\n\nSee you soon!\nThe Lamby Shop";
        const fullMessage = `${body}${footer}`;

        const scanParams = {
            TableName: tableName,
            ProjectionExpression: "email",
        };

        const scanResult = await ddbDocClient.send(new ScanCommand(scanParams));
        const emails = scanResult.Items.map((item) => item.email.S);
        console.log(emails);
        const validEmails = emails.filter(isValidEmail);

        if (validEmails.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "No valid subscriber emails found." }),
            };
        }

        const sendEmailPromises = validEmails.map((email) =>
            sesClient.send(new SendEmailCommand({
                Destination: {
                    ToAddresses: [email],
                },
                Message: {
                    Body: {
                        Text: { Data: fullMessage },
                    },
                    Subject: { Data: subject },
                },
                Source: "thelambyshop@gmail.com", // Replace with a verified email in SES
            }))
        );

        await Promise.all(sendEmailPromises);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            },
            body: JSON.stringify({ message: "Emails sent successfully." }),
        };

    } catch (error) {
        console.error("Error sending emails:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            },
            body: JSON.stringify({ message: "An error occurred while sending emails.", error: error.message }),
        };
    }
};
