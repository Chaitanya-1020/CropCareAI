const axios = require('axios');

async function testApi() {
  try {
    console.log('Sending request to /api/v1/ai/chat...');
    const response = await axios.post('http://localhost:3000/api/v1/ai/chat', {
      message: 'गन्ने की कौन सी किस्म रोग-प्रतिरोधक है?'
    }, {
      timeout: 30000 // 30 sec timeout
    });
    console.log('Success! Response Data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('API Error!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error message:', error.message);
    }
  }
}

testApi();
