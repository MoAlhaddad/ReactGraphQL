const { request } = require('undici');

const UPLOADTHING_API_KEY = process.env.UPLOADTHING_API;

async function registerFile({ name, size, type }) {
  const response = await request('https://api.uploadthing.com/v6/uploadFiles', {
    method: 'POST',
    headers: {
      'X-Uploadthing-Api-Key': "5bdccc9-8fc0-4644-b3ce-480b5209e1ea",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      files: [{
        name,
        size,
        type,
        customId: null
      }],
      acl: 'public-read',
      metadata: null,
      contentDisposition: 'inline'
    })
  });

  const responseBody = await response.body.json();

  if (response.statusCode !== 200) {
    throw new Error(`Failed to register file: ${JSON.stringify(responseBody)}`);
  }

  return responseBody;
}

module.exports = { registerFile };