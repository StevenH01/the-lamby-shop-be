{"changed":true,"filter":false,"title":"addEmail.js","tooltip":"/aws/emailAPI/handlers/addEmail.js","value":"// Create clients and set shared const values outside of the handler.\n\n// Create a DocumentClient that represents the query to add an item\nimport { DynamoDBClient } from '@aws-sdk/client-dynamodb';\nimport { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';\n\nconst client = new DynamoDBClient({region: 'us-west-2'});\nconst ddbDocClient = DynamoDBDocumentClient.from(client);\n\n// Get the DynamoDB table name from environment variables\nconst tableName = 'subscriptionTable';\n\nexport const addEmailHandler = async (event) => {\n    console.info('received:', JSON.stringify(event));\n\n    const isRunningLocally = process.env.AWS_SAM_LOCAL;\n    var payload;\n    if (isRunningLocally) {\n      console.log(\"isRunningLocally =\", isRunningLocally);\n      payload = event.body;\n    }\n    else {\n      console.log(\"isRunningLocally =\", isRunningLocally);\n      payload = JSON.parse(event.body);\n    }\n    // When testing with local JSON file, don't use JSON.parse()\n    // const payload = event.body;\n\n    // Log payload in CloudWatch for potential issues\n    console.info('Logging payload:', JSON.stringify(payload));\n\n    var params = {\n        TableName : tableName,\n        Item: payload\n    };\n    console.log(\"payload=\");\n    console.log(payload);\n\n    try {\n        console.log(\"PutCommand\");\n        const data = await ddbDocClient.send(new PutCommand(params));\n        var item = data.Item;\n        console.log(\"Success - email added\");\n      } catch (err) {\n        console.log(\"Error\", err.stack);\n      }\n\n\n    const response = {\n        statusCode: 200,\n        headers: {\n            \"Access-Control-Allow-Origin\": \"*\",  // Allow all domains, or specify your domain here\n            \"Access-Control-Allow-Headers\": \"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token\",\n            \"Access-Control-Allow-Methods\": \"GET,POST,PUT,DELETE,OPTIONS\",  // Specify the allowed methods\n        },\n        body: JSON.stringify({ email: payload.email })\n    };\n\n    // All log statements are written to CloudWatch\n    console.info(`statusCode: ${response.statusCode}`);\n    return response;\n};","undoManager":{"mark":21,"position":22,"stack":[[{"start":{"row":0,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["// const axios = require('axios')","// const url = 'http://checkip.amazonaws.com/';","let response;","","/**"," *"," * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format"," * @param {Object} event - API Gateway Lambda Proxy Input Format"," *"," * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html "," * @param {Object} context"," *"," * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html"," * @returns {Object} object - API Gateway Lambda Proxy Output Format"," * "," */","exports.lambdaHandler = async (event, context) => {","    try {","        // const ret = await axios(url);","        response = {","            'statusCode': 200,","            'body': JSON.stringify({","                message: 'hello world',","                // location: ret.data.trim()","            })","        }","    } catch (err) {","        console.log(err);","        return err;","    }","","    return response","};",""],"id":2},{"start":{"row":0,"column":0},"end":{"row":62,"column":2},"action":"insert","lines":["// Create clients and set shared const values outside of the handler.","","// Create a DocumentClient that represents the query to add an item","import { DynamoDBClient } from '@aws-sdk/client-dynamodb';","import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';","const client = new DynamoDBClient({region: 'us-west-2'});","const ddbDocClient = DynamoDBDocumentClient.from(client);","","// Get the DynamoDB table name from environment variables","const tableName = 'loginTable';","","export const addItemHandler = async (event) => {","    // if (event.httpMethod !== 'POST') {","    //     throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);","    // }","    // All log statements are written to CloudWatch","    console.info('received:', JSON.stringify(event));","","    // When testing with Postman or API Gateway, use JSON.parse()","    const isRunningLocally = process.env.AWS_SAM_LOCAL;","    var payload;","    if (isRunningLocally) {","      console.log(\"isRunningLocally =\", isRunningLocally);","      payload = event.body;","    }","    else {","      console.log(\"isRunningLocally =\", isRunningLocally);","      payload = JSON.parse(event.body);","    }","    // When testing with local JSON file, don't use JSON.parse()","    // const payload = event.body;","","    // Log payload in CloudWatch for potential issues","    console.info('Logging payload:', JSON.stringify(payload));","","    var params = {","        TableName : tableName,","        Item: payload","    };","    console.log(\"payload=\");","    console.log(payload);","","    try {","        console.log(\"PutCommand\");","        const data = await ddbDocClient.send(new PutCommand(params));","        var item = data.Item;","        console.log(\"Success - login added\");","      } catch (err) {","        console.log(\"Error\", err.stack);","      }","","","    const response = {","        statusCode: 200,","        body: JSON.stringify({ userName: payload.userName })","    };","","    // All log statements are written to CloudWatch","    console.info(`statusCode: ${response.statusCode}`);","    // console.log(`responseId: ` + responseId);","    console.log(`userName: ` + payload.userName);","    return response;","};"]}],[{"start":{"row":11,"column":13},"end":{"row":11,"column":27},"action":"remove","lines":["addItemHandler"],"id":3},{"start":{"row":11,"column":13},"end":{"row":11,"column":14},"action":"insert","lines":["a"]},{"start":{"row":11,"column":14},"end":{"row":11,"column":15},"action":"insert","lines":["d"]},{"start":{"row":11,"column":15},"end":{"row":11,"column":16},"action":"insert","lines":["d"]},{"start":{"row":11,"column":16},"end":{"row":11,"column":17},"action":"insert","lines":["E"]},{"start":{"row":11,"column":17},"end":{"row":11,"column":18},"action":"insert","lines":["m"]},{"start":{"row":11,"column":18},"end":{"row":11,"column":19},"action":"insert","lines":["a"]},{"start":{"row":11,"column":19},"end":{"row":11,"column":20},"action":"insert","lines":["i"]},{"start":{"row":11,"column":20},"end":{"row":11,"column":21},"action":"insert","lines":["l"]}],[{"start":{"row":11,"column":21},"end":{"row":11,"column":22},"action":"insert","lines":["H"],"id":4},{"start":{"row":11,"column":22},"end":{"row":11,"column":23},"action":"insert","lines":["n"]}],[{"start":{"row":11,"column":22},"end":{"row":11,"column":23},"action":"remove","lines":["n"],"id":5}],[{"start":{"row":11,"column":22},"end":{"row":11,"column":23},"action":"insert","lines":["a"],"id":6},{"start":{"row":11,"column":23},"end":{"row":11,"column":24},"action":"insert","lines":["n"]},{"start":{"row":11,"column":24},"end":{"row":11,"column":25},"action":"insert","lines":["d"]},{"start":{"row":11,"column":25},"end":{"row":11,"column":26},"action":"insert","lines":["l"]},{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"insert","lines":[","]},{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"insert","lines":["e"]},{"start":{"row":11,"column":28},"end":{"row":11,"column":29},"action":"insert","lines":["r"]}],[{"start":{"row":11,"column":28},"end":{"row":11,"column":29},"action":"remove","lines":["r"],"id":7},{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"remove","lines":["e"]},{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"remove","lines":[","]}],[{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"insert","lines":["e"],"id":8},{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"insert","lines":["r"]}],[{"start":{"row":9,"column":19},"end":{"row":9,"column":24},"action":"remove","lines":["login"],"id":9},{"start":{"row":9,"column":19},"end":{"row":9,"column":20},"action":"insert","lines":["s"]},{"start":{"row":9,"column":20},"end":{"row":9,"column":21},"action":"insert","lines":["i"]},{"start":{"row":9,"column":21},"end":{"row":9,"column":22},"action":"insert","lines":["n"]},{"start":{"row":9,"column":22},"end":{"row":9,"column":23},"action":"insert","lines":["s"]}],[{"start":{"row":9,"column":22},"end":{"row":9,"column":23},"action":"remove","lines":["s"],"id":10},{"start":{"row":9,"column":21},"end":{"row":9,"column":22},"action":"remove","lines":["n"]},{"start":{"row":9,"column":20},"end":{"row":9,"column":21},"action":"remove","lines":["i"]}],[{"start":{"row":9,"column":20},"end":{"row":9,"column":21},"action":"insert","lines":["u"],"id":11},{"start":{"row":9,"column":21},"end":{"row":9,"column":22},"action":"insert","lines":["b"]},{"start":{"row":9,"column":22},"end":{"row":9,"column":23},"action":"insert","lines":["s"]},{"start":{"row":9,"column":23},"end":{"row":9,"column":24},"action":"insert","lines":["c"]},{"start":{"row":9,"column":24},"end":{"row":9,"column":25},"action":"insert","lines":["r"]},{"start":{"row":9,"column":25},"end":{"row":9,"column":26},"action":"insert","lines":["i"]},{"start":{"row":9,"column":26},"end":{"row":9,"column":27},"action":"insert","lines":["p"]},{"start":{"row":9,"column":27},"end":{"row":9,"column":28},"action":"insert","lines":["t"]},{"start":{"row":9,"column":28},"end":{"row":9,"column":29},"action":"insert","lines":["i"]},{"start":{"row":9,"column":29},"end":{"row":9,"column":30},"action":"insert","lines":["o"]},{"start":{"row":9,"column":30},"end":{"row":9,"column":31},"action":"insert","lines":["n"]}],[{"start":{"row":12,"column":0},"end":{"row":15,"column":51},"action":"remove","lines":["    // if (event.httpMethod !== 'POST') {","    //     throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);","    // }","    // All log statements are written to CloudWatch"],"id":12},{"start":{"row":11,"column":49},"end":{"row":12,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":13,"column":0},"end":{"row":14,"column":65},"action":"remove","lines":["","    // When testing with Postman or API Gateway, use JSON.parse()"],"id":13}],[{"start":{"row":41,"column":31},"end":{"row":41,"column":36},"action":"remove","lines":["login"],"id":14},{"start":{"row":41,"column":31},"end":{"row":41,"column":32},"action":"insert","lines":["e"]},{"start":{"row":41,"column":32},"end":{"row":41,"column":33},"action":"insert","lines":["m"]},{"start":{"row":41,"column":33},"end":{"row":41,"column":34},"action":"insert","lines":["a"]},{"start":{"row":41,"column":34},"end":{"row":41,"column":35},"action":"insert","lines":["i"]},{"start":{"row":41,"column":35},"end":{"row":41,"column":36},"action":"insert","lines":["l"]}],[{"start":{"row":48,"column":24},"end":{"row":49,"column":0},"action":"insert","lines":["",""],"id":15},{"start":{"row":49,"column":0},"end":{"row":49,"column":8},"action":"insert","lines":["        "]},{"start":{"row":49,"column":8},"end":{"row":49,"column":9},"action":"insert","lines":["h"]},{"start":{"row":49,"column":9},"end":{"row":49,"column":10},"action":"insert","lines":["e"]},{"start":{"row":49,"column":10},"end":{"row":49,"column":11},"action":"insert","lines":["a"]},{"start":{"row":49,"column":11},"end":{"row":49,"column":12},"action":"insert","lines":["d"]},{"start":{"row":49,"column":12},"end":{"row":49,"column":13},"action":"insert","lines":["e"]},{"start":{"row":49,"column":13},"end":{"row":49,"column":14},"action":"insert","lines":["r"]},{"start":{"row":49,"column":14},"end":{"row":49,"column":15},"action":"insert","lines":["s"]},{"start":{"row":49,"column":15},"end":{"row":49,"column":16},"action":"insert","lines":[":"]}],[{"start":{"row":49,"column":16},"end":{"row":49,"column":17},"action":"insert","lines":[" "],"id":16}],[{"start":{"row":49,"column":17},"end":{"row":51,"column":106},"action":"insert","lines":["            \"Access-Control-Allow-Origin\": \"*\",  // Allow all domains, or specify your domain here","            \"Access-Control-Allow-Headers\": \"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token\",","            \"Access-Control-Allow-Methods\": \"GET,POST,PUT,DELETE,OPTIONS\",  // Specify the allowed methods"],"id":17}],[{"start":{"row":49,"column":0},"end":{"row":51,"column":106},"action":"remove","lines":["        headers:             \"Access-Control-Allow-Origin\": \"*\",  // Allow all domains, or specify your domain here","            \"Access-Control-Allow-Headers\": \"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token\",","            \"Access-Control-Allow-Methods\": \"GET,POST,PUT,DELETE,OPTIONS\",  // Specify the allowed methods"],"id":18},{"start":{"row":49,"column":0},"end":{"row":53,"column":10},"action":"insert","lines":["        headers: {","            \"Access-Control-Allow-Origin\": \"*\",  // Allow all domains, or specify your domain here","            \"Access-Control-Allow-Headers\": \"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token\",","            \"Access-Control-Allow-Methods\": \"GET,POST,PUT,DELETE,OPTIONS\",  // Specify the allowed methods","        },"]}],[{"start":{"row":59,"column":48},"end":{"row":60,"column":49},"action":"remove","lines":["","    console.log(`userName: ` + payload.userName);"],"id":19},{"start":{"row":59,"column":48},"end":{"row":59,"column":49},"action":"insert","lines":["-"]}],[{"start":{"row":59,"column":48},"end":{"row":59,"column":49},"action":"remove","lines":["-"],"id":20}],[{"start":{"row":58,"column":55},"end":{"row":59,"column":48},"action":"remove","lines":["","    // console.log(`responseId: ` + responseId);"],"id":21}],[{"start":{"row":54,"column":49},"end":{"row":54,"column":57},"action":"remove","lines":["userName"],"id":22},{"start":{"row":54,"column":49},"end":{"row":54,"column":50},"action":"insert","lines":["e"]},{"start":{"row":54,"column":50},"end":{"row":54,"column":51},"action":"insert","lines":["m"]},{"start":{"row":54,"column":51},"end":{"row":54,"column":52},"action":"insert","lines":["a"]},{"start":{"row":54,"column":52},"end":{"row":54,"column":53},"action":"insert","lines":["i"]},{"start":{"row":54,"column":53},"end":{"row":54,"column":54},"action":"insert","lines":["l"]}],[{"start":{"row":54,"column":31},"end":{"row":54,"column":39},"action":"remove","lines":["userName"],"id":23},{"start":{"row":54,"column":31},"end":{"row":54,"column":32},"action":"insert","lines":["e"]},{"start":{"row":54,"column":32},"end":{"row":54,"column":33},"action":"insert","lines":["m"]},{"start":{"row":54,"column":33},"end":{"row":54,"column":34},"action":"insert","lines":["a"]},{"start":{"row":54,"column":34},"end":{"row":54,"column":35},"action":"insert","lines":["i"]},{"start":{"row":54,"column":35},"end":{"row":54,"column":36},"action":"insert","lines":["l"]}],[{"start":{"row":4,"column":103},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":24}]]},"ace":{"folds":[],"scrolltop":420,"scrollleft":0,"selection":{"start":{"row":16,"column":16},"end":{"row":16,"column":16},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":29,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1731390967670}