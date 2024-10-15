import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import client from '../../dynamodb';

export default async function handler(req, res) {
  try {
    const params = {
      //   TableName: `${process.env.DYNAMO_DB_TABLE_PREFIX}-Products`
      TableName: `${process.env.DYNAMO_DB_TABLE_PREFIX}-Products`,
    };

    const command = new ScanCommand(params);
    const response = await client.send(command);

    res.status(200).json(response.Items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from DynamoDB' });
  }
}
