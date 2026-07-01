const axios = require('axios');
require('dotenv').config({ path: './config.env' });

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    console.log('Fetching models from:', url.substring(0, 75) + '...');
    const response = await axios.get(url);
    const models = response.data.models.map(m => ({
      name: m.name,
      displayName: m.displayName,
      supportedGenerationMethods: m.supportedGenerationMethods
    }));
    console.log('Available models:', JSON.stringify(models, null, 2));
  } catch (error) {
    console.error('Error listing models:', error.response ? error.response.data : error.message);
  }
}

listModels();
