// pages/api/links.js

import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'your-aws-region',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'your-dynamodb-table-name';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // เพิ่มลิงค์ใหม่
    const { link } = req.body;
    try {
      await dynamoDB.put({
        TableName: tableName,
        Item: {
          id: generateUniqueId(), // สร้าง unique ID
          link: link,
          createdAt: new Date().toISOString(),
        },
      }).promise();
      res.status(201).json({ message: 'Link added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding link' });
    }
  } else if (req.method === 'GET') {
    // ดึงลิงค์ทั้งหมด
    try {
      const data = await dynamoDB.scan({ TableName: tableName }).promise();
      res.status(200).json(data.Items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching links' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
