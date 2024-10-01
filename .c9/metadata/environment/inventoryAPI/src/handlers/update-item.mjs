{"filter":false,"title":"update-item.mjs","tooltip":"/inventoryAPI/src/handlers/update-item.mjs","undoManager":{"mark":33,"position":33,"stack":[[{"start":{"row":0,"column":0},"end":{"row":129,"column":2},"action":"insert","lines":["// Create clients and set shared const values outside of the handler.","","// Create a DocumentClient that represents the query to add an item","import { DynamoDBClient } from '@aws-sdk/client-dynamodb';","import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';","const client = new DynamoDBClient({region: 'us-west-2'});","const ddbDocClient = DynamoDBDocumentClient.from(client);","import {putObject} from './s3.mjs'","","// Get the DynamoDB table name from environment variables","// const tableName = process.env.CITIZEN_TABLE;","const tableName = 'citizenTable';","const mulesoftBucket = 's3-us-west-2-update-citizen';","","// Function that extracts documentNumber and issueDate and puts it into s3 bucket for Mulesoft","async function extractValues(retrievedNumber, retrievedDate) {","  var documentNumber = retrievedNumber;","  var issueDate = retrievedDate;","","  try {","    var bucket = mulesoftBucket;","    var objectKey = documentNumber + \"_update.csv\";","    var objectBody = documentNumber + ',' + issueDate;","","    var putValuesResponse = await putObject(bucket, objectKey, objectBody);","    console.log(\"putValuesResponse=\", putValuesResponse);","  } catch (err) {","    console.log(\"extractValues() error: \", err);","  }","}","","export const updateCitizenHandler = async (event) => {","    // All log statements are written to CloudWatch","    console.info('received:', event);","","    // Retrieve documentNumber from path parameters","    const isRunningLocally = process.env.AWS_SAM_LOCAL;","    var retrievedNumber;","    var retrievedDate;","    var payload;","    if (isRunningLocally) {","      console.log(\"isRunningLocally =\", isRunningLocally);","      retrievedNumber = event.pathParameters.documentNumber;","      retrievedDate = event.body.issue;","      payload = event.body;","    }","    else {","      console.log(\"isRunningLocally =\", isRunningLocally);","      retrievedNumber = event.pathParameters.documentNumber;","      retrievedDate = event.body.issue;","      payload = JSON.parse(event.body);","    }","    var documentNumber = {","        \"documentNumber\": retrievedNumber","      };","","    // Add documentNumber and issueDate values to s3 bucket","    extractValues(retrievedNumber, retrievedDate);","    // Add portrait values to different s3 bucket specifically for portraits","    try {","      var bucket = process.env.S3_BUCKET;","      var portraitkey = retrievedNumber + \"_portrait.txt\";","      var idImageBackKey = retrievedNumber + \"_idImageBack.txt\";","      var idImageFrontKey = retrievedNumber + \"_idImageFront.txt\";","       ","      var putPortraitResponse = await putObject(bucket,portraitkey,payload.portrait);","      var putIdImageBackResponse = await putObject(bucket, idImageBackKey,payload.idImageBack);","      var putIdImageFrontResponse = await putObject(bucket, idImageFrontKey,payload.idImageFront);","      ","      console.log(\"putPortraitResponse\", putPortraitResponse);","      console.log(\"putIdImageBackResponse\", putIdImageBackResponse);","      console.log(\"putIdImageFrontResponse\", putIdImageFrontResponse);","      ","    } catch (err) {","        console.log(\"Error: \", err);","    }","    payload.documentNumber = retrievedNumber;","    payload.portrait = portraitkey;","    payload.idImageBack = idImageBackKey;","    payload.idImageFront = idImageFrontKey;","","    // Retrieve the updated payload","    // When testing locally, do not include JSON.parse()","    // When testing with API Gatway or Postman, use JSON.parse()","    const updatedPayload = {","        ...documentNumber,","        ...payload","    }","    console.log(updatedPayload);","","    // Initialize the errors","    var error = \"N/A\";","","    var params = {","        TableName : tableName,","        Item: updatedPayload","    };","","    try {","        console.log(\"Updating citizen...\");","        const data = await ddbDocClient.send(new PutCommand(params));","        var item = data.Item;","        console.log(\"Citizen updated.\", data);","      } catch (err) {","        error = err.stack;","        console.log(\"Error\", err.stack);","      }","","    // Create an error array","    var errorArray = {","        error: error,","        message: error","    };","","    const response = {","        statusCode: 200,","        // responseId: responseId,","        // documentNumber: retrievedNumber,","        // error: errorArray","        headers: { \"Content-Type\": \"application/json\" },","        body: JSON.stringify({ documentNumber: retrievedNumber, errors: errorArray })","    };","","    // All log statements are written to CloudWatch","    console.info(`statusCode: ${response.statusCode}`);","    // console.log(`responseId: ` + responseId);","    console.log(`documentNumber: ` + retrievedNumber);","    console.log(`errors: ` + JSON.stringify(errorArray));","    return response;","};"],"id":1}],[{"start":{"row":11,"column":0},"end":{"row":11,"column":33},"action":"remove","lines":["const tableName = 'citizenTable';"],"id":2},{"start":{"row":11,"column":0},"end":{"row":11,"column":33},"action":"insert","lines":["const tableName = 'productTable';"]}],[{"start":{"row":11,"column":33},"end":{"row":12,"column":53},"action":"remove","lines":["","const mulesoftBucket = 's3-us-west-2-update-citizen';"],"id":3}],[{"start":{"row":10,"column":0},"end":{"row":10,"column":47},"action":"remove","lines":["// const tableName = process.env.CITIZEN_TABLE;"],"id":4},{"start":{"row":9,"column":57},"end":{"row":10,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":9,"column":0},"end":{"row":9,"column":57},"action":"remove","lines":["// Get the DynamoDB table name from environment variables"],"id":5},{"start":{"row":8,"column":0},"end":{"row":9,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":7,"column":0},"end":{"row":7,"column":34},"action":"remove","lines":["import {putObject} from './s3.mjs'"],"id":6},{"start":{"row":6,"column":57},"end":{"row":7,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":10,"column":0},"end":{"row":25,"column":1},"action":"remove","lines":["// Function that extracts documentNumber and issueDate and puts it into s3 bucket for Mulesoft","async function extractValues(retrievedNumber, retrievedDate) {","  var documentNumber = retrievedNumber;","  var issueDate = retrievedDate;","","  try {","    var bucket = mulesoftBucket;","    var objectKey = documentNumber + \"_update.csv\";","    var objectBody = documentNumber + ',' + issueDate;","","    var putValuesResponse = await putObject(bucket, objectKey, objectBody);","    console.log(\"putValuesResponse=\", putValuesResponse);","  } catch (err) {","    console.log(\"extractValues() error: \", err);","  }","}"],"id":7},{"start":{"row":9,"column":0},"end":{"row":10,"column":0},"action":"remove","lines":["",""]},{"start":{"row":8,"column":33},"end":{"row":9,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":16,"column":8},"end":{"row":16,"column":23},"action":"remove","lines":["retrievedNumber"],"id":8},{"start":{"row":16,"column":8},"end":{"row":16,"column":9},"action":"insert","lines":["i"]},{"start":{"row":16,"column":9},"end":{"row":16,"column":10},"action":"insert","lines":["t"]},{"start":{"row":16,"column":10},"end":{"row":16,"column":11},"action":"insert","lines":["e"]},{"start":{"row":16,"column":11},"end":{"row":16,"column":12},"action":"insert","lines":["m"]},{"start":{"row":16,"column":12},"end":{"row":16,"column":13},"action":"insert","lines":["N"]},{"start":{"row":16,"column":13},"end":{"row":16,"column":14},"action":"insert","lines":["a"]},{"start":{"row":16,"column":14},"end":{"row":16,"column":15},"action":"insert","lines":["m"]},{"start":{"row":16,"column":15},"end":{"row":16,"column":16},"action":"insert","lines":["e"]}],[{"start":{"row":16,"column":17},"end":{"row":17,"column":22},"action":"remove","lines":["","    var retrievedDate;"],"id":9}],[{"start":{"row":20,"column":60},"end":{"row":21,"column":39},"action":"remove","lines":["","      retrievedDate = event.body.issue;"],"id":10}],[{"start":{"row":20,"column":6},"end":{"row":20,"column":21},"action":"remove","lines":["retrievedNumber"],"id":11},{"start":{"row":20,"column":6},"end":{"row":20,"column":7},"action":"insert","lines":["i"]},{"start":{"row":20,"column":7},"end":{"row":20,"column":8},"action":"insert","lines":["t"]},{"start":{"row":20,"column":8},"end":{"row":20,"column":9},"action":"insert","lines":["e"]},{"start":{"row":20,"column":9},"end":{"row":20,"column":10},"action":"insert","lines":["m"]},{"start":{"row":20,"column":10},"end":{"row":20,"column":11},"action":"insert","lines":["N"]},{"start":{"row":20,"column":11},"end":{"row":20,"column":12},"action":"insert","lines":["a"]},{"start":{"row":20,"column":12},"end":{"row":20,"column":13},"action":"insert","lines":["m"]},{"start":{"row":20,"column":13},"end":{"row":20,"column":14},"action":"insert","lines":["e"]}],[{"start":{"row":20,"column":38},"end":{"row":20,"column":52},"action":"remove","lines":["documentNumber"],"id":12},{"start":{"row":20,"column":38},"end":{"row":20,"column":39},"action":"insert","lines":["i"]},{"start":{"row":20,"column":39},"end":{"row":20,"column":40},"action":"insert","lines":["t"]},{"start":{"row":20,"column":40},"end":{"row":20,"column":41},"action":"insert","lines":["e"]},{"start":{"row":20,"column":41},"end":{"row":20,"column":42},"action":"insert","lines":["m"]},{"start":{"row":20,"column":42},"end":{"row":20,"column":43},"action":"insert","lines":["N"]},{"start":{"row":20,"column":43},"end":{"row":20,"column":44},"action":"insert","lines":["a"]},{"start":{"row":20,"column":44},"end":{"row":20,"column":45},"action":"insert","lines":["m"]},{"start":{"row":20,"column":45},"end":{"row":20,"column":46},"action":"insert","lines":["e"]}],[{"start":{"row":25,"column":60},"end":{"row":26,"column":39},"action":"remove","lines":["","      retrievedDate = event.body.issue;"],"id":13}],[{"start":{"row":25,"column":45},"end":{"row":25,"column":59},"action":"remove","lines":["documentNumber"],"id":14},{"start":{"row":25,"column":45},"end":{"row":25,"column":46},"action":"insert","lines":["i"]},{"start":{"row":25,"column":46},"end":{"row":25,"column":47},"action":"insert","lines":["t"]},{"start":{"row":25,"column":47},"end":{"row":25,"column":48},"action":"insert","lines":["e"]},{"start":{"row":25,"column":48},"end":{"row":25,"column":49},"action":"insert","lines":["m"]},{"start":{"row":25,"column":49},"end":{"row":25,"column":50},"action":"insert","lines":["N"]},{"start":{"row":25,"column":50},"end":{"row":25,"column":51},"action":"insert","lines":["a"]},{"start":{"row":25,"column":51},"end":{"row":25,"column":52},"action":"insert","lines":["m"]},{"start":{"row":25,"column":52},"end":{"row":25,"column":53},"action":"insert","lines":["e"]}],[{"start":{"row":25,"column":6},"end":{"row":25,"column":21},"action":"remove","lines":["retrievedNumber"],"id":15},{"start":{"row":25,"column":6},"end":{"row":25,"column":7},"action":"insert","lines":["i"]},{"start":{"row":25,"column":7},"end":{"row":25,"column":8},"action":"insert","lines":["t"]},{"start":{"row":25,"column":8},"end":{"row":25,"column":9},"action":"insert","lines":["e"]},{"start":{"row":25,"column":9},"end":{"row":25,"column":10},"action":"insert","lines":["m"]},{"start":{"row":25,"column":10},"end":{"row":25,"column":11},"action":"insert","lines":["N"]},{"start":{"row":25,"column":11},"end":{"row":25,"column":12},"action":"insert","lines":["a"]},{"start":{"row":25,"column":12},"end":{"row":25,"column":13},"action":"insert","lines":["m"]},{"start":{"row":25,"column":13},"end":{"row":25,"column":14},"action":"insert","lines":["e"]}],[{"start":{"row":28,"column":8},"end":{"row":28,"column":22},"action":"remove","lines":["documentNumber"],"id":16},{"start":{"row":28,"column":8},"end":{"row":28,"column":9},"action":"insert","lines":["i"]},{"start":{"row":28,"column":9},"end":{"row":28,"column":10},"action":"insert","lines":["t"]},{"start":{"row":28,"column":10},"end":{"row":28,"column":11},"action":"insert","lines":["e"]},{"start":{"row":28,"column":11},"end":{"row":28,"column":12},"action":"insert","lines":["m"]},{"start":{"row":28,"column":12},"end":{"row":28,"column":13},"action":"insert","lines":["N"]},{"start":{"row":28,"column":13},"end":{"row":28,"column":14},"action":"insert","lines":["a"]},{"start":{"row":28,"column":14},"end":{"row":28,"column":15},"action":"insert","lines":["m"]},{"start":{"row":28,"column":15},"end":{"row":28,"column":16},"action":"insert","lines":["e"]}],[{"start":{"row":29,"column":9},"end":{"row":29,"column":23},"action":"remove","lines":["documentNumber"],"id":17},{"start":{"row":29,"column":9},"end":{"row":29,"column":10},"action":"insert","lines":["i"]},{"start":{"row":29,"column":10},"end":{"row":29,"column":11},"action":"insert","lines":["t"]},{"start":{"row":29,"column":11},"end":{"row":29,"column":12},"action":"insert","lines":["e"]},{"start":{"row":29,"column":12},"end":{"row":29,"column":13},"action":"insert","lines":["m"]},{"start":{"row":29,"column":13},"end":{"row":29,"column":14},"action":"insert","lines":["N"]},{"start":{"row":29,"column":14},"end":{"row":29,"column":15},"action":"insert","lines":["a"]},{"start":{"row":29,"column":15},"end":{"row":29,"column":16},"action":"insert","lines":["m"]},{"start":{"row":29,"column":16},"end":{"row":29,"column":17},"action":"insert","lines":["e"]}],[{"start":{"row":29,"column":20},"end":{"row":29,"column":35},"action":"remove","lines":["retrievedNumber"],"id":18},{"start":{"row":29,"column":20},"end":{"row":29,"column":21},"action":"insert","lines":["i"]},{"start":{"row":29,"column":21},"end":{"row":29,"column":22},"action":"insert","lines":["t"]},{"start":{"row":29,"column":22},"end":{"row":29,"column":23},"action":"insert","lines":["e"]},{"start":{"row":29,"column":23},"end":{"row":29,"column":24},"action":"insert","lines":["m"]},{"start":{"row":29,"column":24},"end":{"row":29,"column":25},"action":"insert","lines":["N"]},{"start":{"row":29,"column":25},"end":{"row":29,"column":26},"action":"insert","lines":["a"]},{"start":{"row":29,"column":26},"end":{"row":29,"column":27},"action":"insert","lines":["m"]},{"start":{"row":29,"column":27},"end":{"row":29,"column":28},"action":"insert","lines":["e"]}],[{"start":{"row":32,"column":0},"end":{"row":51,"column":5},"action":"remove","lines":["    // Add documentNumber and issueDate values to s3 bucket","    extractValues(retrievedNumber, retrievedDate);","    // Add portrait values to different s3 bucket specifically for portraits","    try {","      var bucket = process.env.S3_BUCKET;","      var portraitkey = retrievedNumber + \"_portrait.txt\";","      var idImageBackKey = retrievedNumber + \"_idImageBack.txt\";","      var idImageFrontKey = retrievedNumber + \"_idImageFront.txt\";","       ","      var putPortraitResponse = await putObject(bucket,portraitkey,payload.portrait);","      var putIdImageBackResponse = await putObject(bucket, idImageBackKey,payload.idImageBack);","      var putIdImageFrontResponse = await putObject(bucket, idImageFrontKey,payload.idImageFront);","      ","      console.log(\"putPortraitResponse\", putPortraitResponse);","      console.log(\"putIdImageBackResponse\", putIdImageBackResponse);","      console.log(\"putIdImageFrontResponse\", putIdImageFrontResponse);","      ","    } catch (err) {","        console.log(\"Error: \", err);","    }"],"id":19}],[{"start":{"row":34,"column":35},"end":{"row":37,"column":0},"action":"remove","lines":["","    payload.idImageBack = idImageBackKey;","    payload.idImageFront = idImageFrontKey;",""],"id":20}],[{"start":{"row":34,"column":4},"end":{"row":34,"column":35},"action":"remove","lines":["payload.portrait = portraitkey;"],"id":21},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"remove","lines":["    "]},{"start":{"row":33,"column":45},"end":{"row":34,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":33,"column":4},"end":{"row":33,"column":45},"action":"remove","lines":["payload.documentNumber = retrievedNumber;"],"id":22},{"start":{"row":33,"column":0},"end":{"row":33,"column":4},"action":"remove","lines":["    "]},{"start":{"row":32,"column":0},"end":{"row":33,"column":0},"action":"remove","lines":["",""]},{"start":{"row":31,"column":0},"end":{"row":32,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":36,"column":11},"end":{"row":36,"column":25},"action":"remove","lines":["documentNumber"],"id":23},{"start":{"row":36,"column":11},"end":{"row":36,"column":12},"action":"insert","lines":["i"]},{"start":{"row":36,"column":12},"end":{"row":36,"column":13},"action":"insert","lines":["t"]},{"start":{"row":36,"column":13},"end":{"row":36,"column":14},"action":"insert","lines":["e"]},{"start":{"row":36,"column":14},"end":{"row":36,"column":15},"action":"insert","lines":["m"]},{"start":{"row":36,"column":15},"end":{"row":36,"column":16},"action":"insert","lines":["N"]},{"start":{"row":36,"column":16},"end":{"row":36,"column":17},"action":"insert","lines":["a"]},{"start":{"row":36,"column":17},"end":{"row":36,"column":18},"action":"insert","lines":["m"]},{"start":{"row":36,"column":18},"end":{"row":36,"column":19},"action":"insert","lines":["e"]}],[{"start":{"row":50,"column":30},"end":{"row":50,"column":37},"action":"remove","lines":["citizen"],"id":24},{"start":{"row":50,"column":30},"end":{"row":50,"column":31},"action":"insert","lines":["i"]},{"start":{"row":50,"column":31},"end":{"row":50,"column":32},"action":"insert","lines":["g"]}],[{"start":{"row":50,"column":31},"end":{"row":50,"column":32},"action":"remove","lines":["g"],"id":25}],[{"start":{"row":50,"column":31},"end":{"row":50,"column":32},"action":"insert","lines":["t"],"id":26},{"start":{"row":50,"column":32},"end":{"row":50,"column":33},"action":"insert","lines":["e"]},{"start":{"row":50,"column":33},"end":{"row":50,"column":34},"action":"insert","lines":["m"]}],[{"start":{"row":53,"column":21},"end":{"row":53,"column":28},"action":"remove","lines":["Citizen"],"id":27},{"start":{"row":53,"column":21},"end":{"row":53,"column":22},"action":"insert","lines":["I"]},{"start":{"row":53,"column":22},"end":{"row":53,"column":23},"action":"insert","lines":["t"]},{"start":{"row":53,"column":23},"end":{"row":53,"column":24},"action":"insert","lines":["e"]},{"start":{"row":53,"column":24},"end":{"row":53,"column":25},"action":"insert","lines":["m"]}],[{"start":{"row":71,"column":31},"end":{"row":71,"column":45},"action":"remove","lines":["documentNumber"],"id":28},{"start":{"row":71,"column":31},"end":{"row":71,"column":32},"action":"insert","lines":["i"]},{"start":{"row":71,"column":32},"end":{"row":71,"column":33},"action":"insert","lines":["t"]},{"start":{"row":71,"column":33},"end":{"row":71,"column":34},"action":"insert","lines":["e"]},{"start":{"row":71,"column":34},"end":{"row":71,"column":35},"action":"insert","lines":["m"]},{"start":{"row":71,"column":35},"end":{"row":71,"column":36},"action":"insert","lines":["N"]},{"start":{"row":71,"column":36},"end":{"row":71,"column":37},"action":"insert","lines":["a"]},{"start":{"row":71,"column":37},"end":{"row":71,"column":38},"action":"insert","lines":["m"]},{"start":{"row":71,"column":38},"end":{"row":71,"column":39},"action":"insert","lines":["e"]}],[{"start":{"row":71,"column":41},"end":{"row":71,"column":56},"action":"remove","lines":["retrievedNumber"],"id":29},{"start":{"row":71,"column":41},"end":{"row":71,"column":42},"action":"insert","lines":["i"]},{"start":{"row":71,"column":42},"end":{"row":71,"column":43},"action":"insert","lines":["t"]},{"start":{"row":71,"column":43},"end":{"row":71,"column":44},"action":"insert","lines":["e"]},{"start":{"row":71,"column":44},"end":{"row":71,"column":45},"action":"insert","lines":["m"]},{"start":{"row":71,"column":45},"end":{"row":71,"column":46},"action":"insert","lines":["N"]},{"start":{"row":71,"column":46},"end":{"row":71,"column":47},"action":"insert","lines":["a"]},{"start":{"row":71,"column":47},"end":{"row":71,"column":48},"action":"insert","lines":["m"]},{"start":{"row":71,"column":48},"end":{"row":71,"column":49},"action":"insert","lines":["e"]}],[{"start":{"row":77,"column":17},"end":{"row":77,"column":31},"action":"remove","lines":["documentNumber"],"id":30},{"start":{"row":77,"column":17},"end":{"row":77,"column":18},"action":"insert","lines":["i"]},{"start":{"row":77,"column":18},"end":{"row":77,"column":19},"action":"insert","lines":["t"]},{"start":{"row":77,"column":19},"end":{"row":77,"column":20},"action":"insert","lines":["e"]},{"start":{"row":77,"column":20},"end":{"row":77,"column":21},"action":"insert","lines":["m"]},{"start":{"row":77,"column":21},"end":{"row":77,"column":22},"action":"insert","lines":["N"]},{"start":{"row":77,"column":22},"end":{"row":77,"column":23},"action":"insert","lines":["a"]},{"start":{"row":77,"column":23},"end":{"row":77,"column":24},"action":"insert","lines":["m"]},{"start":{"row":77,"column":24},"end":{"row":77,"column":25},"action":"insert","lines":["e"]}],[{"start":{"row":77,"column":31},"end":{"row":77,"column":46},"action":"remove","lines":["retrievedNumber"],"id":31},{"start":{"row":77,"column":31},"end":{"row":77,"column":32},"action":"insert","lines":["i"]},{"start":{"row":77,"column":32},"end":{"row":77,"column":33},"action":"insert","lines":["t"]},{"start":{"row":77,"column":33},"end":{"row":77,"column":34},"action":"insert","lines":["e"]},{"start":{"row":77,"column":34},"end":{"row":77,"column":35},"action":"insert","lines":["m"]},{"start":{"row":77,"column":35},"end":{"row":77,"column":36},"action":"insert","lines":["N"]},{"start":{"row":77,"column":36},"end":{"row":77,"column":37},"action":"insert","lines":["a"]},{"start":{"row":77,"column":37},"end":{"row":77,"column":38},"action":"insert","lines":["m"]},{"start":{"row":77,"column":38},"end":{"row":77,"column":39},"action":"insert","lines":["e"]}],[{"start":{"row":10,"column":19},"end":{"row":10,"column":26},"action":"remove","lines":["Citizen"],"id":32},{"start":{"row":10,"column":19},"end":{"row":10,"column":20},"action":"insert","lines":["O"]}],[{"start":{"row":10,"column":19},"end":{"row":10,"column":20},"action":"remove","lines":["O"],"id":33}],[{"start":{"row":10,"column":19},"end":{"row":10,"column":20},"action":"insert","lines":["I"],"id":34},{"start":{"row":10,"column":20},"end":{"row":10,"column":21},"action":"insert","lines":["t"]},{"start":{"row":10,"column":21},"end":{"row":10,"column":22},"action":"insert","lines":["e"]},{"start":{"row":10,"column":22},"end":{"row":10,"column":23},"action":"insert","lines":["m"]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":16,"column":17},"end":{"row":16,"column":17},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1726340467180,"hash":"7a21106dc85b12b9c7a33ca20bae914e8515ed6d"}