{"changed":true,"filter":false,"title":"subsribeEmail.js","tooltip":"/aws/emailAPI/handlers/subsribeEmail.js","value":"// Create clients and set shared const values outside of the handler.\n\n// Create a DocumentClient that represents the query to add an item\nimport { DynamoDBClient } from '@aws-sdk/client-dynamodb';\nimport { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';\nconst client = new DynamoDBClient({region: 'us-west-2'});\nconst ddbDocClient = DynamoDBDocumentClient.from(client);\n\n// Get the DynamoDB table name from environment variables\nconst tableName = 'loginTable';\n\nexport const addEmailHandler = async (event) => {\n    // if (event.httpMethod !== 'POST') {\n    //     throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);\n    // }\n    // All log statements are written to CloudWatch\n    console.info('received:', JSON.stringify(event));\n\n    // When testing with Postman or API Gateway, use JSON.parse()\n    const isRunningLocally = process.env.AWS_SAM_LOCAL;\n    var payload;\n    if (isRunningLocally) {\n      console.log(\"isRunningLocally =\", isRunningLocally);\n      payload = event.body;\n    }\n    else {\n      console.log(\"isRunningLocally =\", isRunningLocally);\n      payload = JSON.parse(event.body);\n    }\n    // When testing with local JSON file, don't use JSON.parse()\n    // const payload = event.body;\n\n    // Log payload in CloudWatch for potential issues\n    console.info('Logging payload:', JSON.stringify(payload));\n\n    var params = {\n        TableName : tableName,\n        Item: payload\n    };\n    console.log(\"payload=\");\n    console.log(payload);\n\n    try {\n        console.log(\"PutCommand\");\n        const data = await ddbDocClient.send(new PutCommand(params));\n        var item = data.Item;\n        console.log(\"Success - login added\");\n      } catch (err) {\n        console.log(\"Error\", err.stack);\n      }\n\n\n    const response = {\n        statusCode: 200,\n        body: JSON.stringify({ userName: payload.userName })\n    };\n\n    // All log statements are written to CloudWatch\n    console.info(`statusCode: ${response.statusCode}`);\n    // console.log(`responseId: ` + responseId);\n    console.log(`userName: ` + payload.userName);\n    return response;\n};","undoManager":{"mark":-2,"position":6,"stack":[[{"start":{"row":0,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["// const axios = require('axios')","// const url = 'http://checkip.amazonaws.com/';","let response;","","/**"," *"," * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format"," * @param {Object} event - API Gateway Lambda Proxy Input Format"," *"," * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html "," * @param {Object} context"," *"," * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html"," * @returns {Object} object - API Gateway Lambda Proxy Output Format"," * "," */","exports.lambdaHandler = async (event, context) => {","    try {","        // const ret = await axios(url);","        response = {","            'statusCode': 200,","            'body': JSON.stringify({","                message: 'hello world',","                // location: ret.data.trim()","            })","        }","    } catch (err) {","        console.log(err);","        return err;","    }","","    return response","};",""],"id":2},{"start":{"row":0,"column":0},"end":{"row":62,"column":2},"action":"insert","lines":["// Create clients and set shared const values outside of the handler.","","// Create a DocumentClient that represents the query to add an item","import { DynamoDBClient } from '@aws-sdk/client-dynamodb';","import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';","const client = new DynamoDBClient({region: 'us-west-2'});","const ddbDocClient = DynamoDBDocumentClient.from(client);","","// Get the DynamoDB table name from environment variables","const tableName = 'loginTable';","","export const addItemHandler = async (event) => {","    // if (event.httpMethod !== 'POST') {","    //     throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);","    // }","    // All log statements are written to CloudWatch","    console.info('received:', JSON.stringify(event));","","    // When testing with Postman or API Gateway, use JSON.parse()","    const isRunningLocally = process.env.AWS_SAM_LOCAL;","    var payload;","    if (isRunningLocally) {","      console.log(\"isRunningLocally =\", isRunningLocally);","      payload = event.body;","    }","    else {","      console.log(\"isRunningLocally =\", isRunningLocally);","      payload = JSON.parse(event.body);","    }","    // When testing with local JSON file, don't use JSON.parse()","    // const payload = event.body;","","    // Log payload in CloudWatch for potential issues","    console.info('Logging payload:', JSON.stringify(payload));","","    var params = {","        TableName : tableName,","        Item: payload","    };","    console.log(\"payload=\");","    console.log(payload);","","    try {","        console.log(\"PutCommand\");","        const data = await ddbDocClient.send(new PutCommand(params));","        var item = data.Item;","        console.log(\"Success - login added\");","      } catch (err) {","        console.log(\"Error\", err.stack);","      }","","","    const response = {","        statusCode: 200,","        body: JSON.stringify({ userName: payload.userName })","    };","","    // All log statements are written to CloudWatch","    console.info(`statusCode: ${response.statusCode}`);","    // console.log(`responseId: ` + responseId);","    console.log(`userName: ` + payload.userName);","    return response;","};"]}],[{"start":{"row":11,"column":13},"end":{"row":11,"column":27},"action":"remove","lines":["addItemHandler"],"id":3},{"start":{"row":11,"column":13},"end":{"row":11,"column":14},"action":"insert","lines":["a"]},{"start":{"row":11,"column":14},"end":{"row":11,"column":15},"action":"insert","lines":["d"]},{"start":{"row":11,"column":15},"end":{"row":11,"column":16},"action":"insert","lines":["d"]},{"start":{"row":11,"column":16},"end":{"row":11,"column":17},"action":"insert","lines":["E"]},{"start":{"row":11,"column":17},"end":{"row":11,"column":18},"action":"insert","lines":["m"]},{"start":{"row":11,"column":18},"end":{"row":11,"column":19},"action":"insert","lines":["a"]},{"start":{"row":11,"column":19},"end":{"row":11,"column":20},"action":"insert","lines":["i"]},{"start":{"row":11,"column":20},"end":{"row":11,"column":21},"action":"insert","lines":["l"]}],[{"start":{"row":11,"column":21},"end":{"row":11,"column":22},"action":"insert","lines":["H"],"id":4},{"start":{"row":11,"column":22},"end":{"row":11,"column":23},"action":"insert","lines":["n"]}],[{"start":{"row":11,"column":22},"end":{"row":11,"column":23},"action":"remove","lines":["n"],"id":5}],[{"start":{"row":11,"column":22},"end":{"row":11,"column":23},"action":"insert","lines":["a"],"id":6},{"start":{"row":11,"column":23},"end":{"row":11,"column":24},"action":"insert","lines":["n"]},{"start":{"row":11,"column":24},"end":{"row":11,"column":25},"action":"insert","lines":["d"]},{"start":{"row":11,"column":25},"end":{"row":11,"column":26},"action":"insert","lines":["l"]},{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"insert","lines":[","]},{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"insert","lines":["e"]},{"start":{"row":11,"column":28},"end":{"row":11,"column":29},"action":"insert","lines":["r"]}],[{"start":{"row":11,"column":28},"end":{"row":11,"column":29},"action":"remove","lines":["r"],"id":7},{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"remove","lines":["e"]},{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"remove","lines":[","]}],[{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"insert","lines":["e"],"id":8},{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"insert","lines":["r"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":11,"column":28},"end":{"row":11,"column":28},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":11,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1731384862925}