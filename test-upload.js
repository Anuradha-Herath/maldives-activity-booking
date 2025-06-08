const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function testUpload() {
  try {
    // Create a simple test image file (1x1 pixel PNG)
    const testImagePath = path.join(__dirname, 'test-image.png');
    
    // Base64 of a 1x1 transparent PNG
    const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA6wjuggAAAABJRU5ErkJggg==';
    const buffer = Buffer.from(base64PNG, 'base64');
    
    // Write the test image
    fs.writeFileSync(testImagePath, buffer);
    console.log('✅ Test image created');
    
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath), {
      filename: 'test-image.png',
      contentType: 'image/png'
    });
    
    console.log('🚀 Attempting upload to http://localhost:5000/api/v1/upload');
    
    // Make the upload request
    const response = await axios.post('http://localhost:5000/api/v1/upload', form, {
      headers: {
        ...form.getHeaders(),
        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`
      },
      timeout: 30000
    });
    
    console.log('✅ Upload successful!');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    
    // Clean up test file
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
      console.log('🧹 Test image cleaned up');
    }
    
  } catch (error) {
    console.error('❌ Upload failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    
    // Clean up test file even on error
    const testImagePath = path.join(__dirname, 'test-image.png');
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
  }
}

testUpload();
