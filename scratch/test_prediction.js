const axios = require('axios');

async function testGeneral() {
  try {
    console.log('Sending request to Node backend /api/v1/ai/general...');
    const response = await axios.post('http://127.0.0.1:3000/api/v1/ai/general', {
      message: 'गन्ने की कौन सी किस्म रोग-प्रतिरोधक है?'
    });
    console.log('Success! Response:', response.data);
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

testGeneral();
