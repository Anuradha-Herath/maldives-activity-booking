// Comprehensive Image Upload Test
// This test validates the entire image upload pipeline

const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Test results tracker
const results = {
  tests: [],
  passed: 0,
  failed: 0
};

function logTest(name, passed, details = '') {
  results.tests.push({ name, passed, details });
  if (passed) {
    results.passed++;
    console.log(`✅ ${name}`);
  } else {
    results.failed++;
    console.log(`❌ ${name}: ${details}`);
  }
}

async function runComprehensiveUploadTest() {
  console.log('🚀 Starting Comprehensive Image Upload Test');
  console.log('=' .repeat(50));
  
  // Test 1: Server Connectivity
  try {
    const statusResponse = await axios.get('http://localhost:5000/api/v1/server-status');
    logTest('Server Connectivity', statusResponse.status === 200);
  } catch (error) {
    logTest('Server Connectivity', false, error.message);
    return;
  }
  
  // Test 2: Cloudinary Configuration Test
  try {
    const testImagePath = path.join(__dirname, 'test-image-1.png');
    const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA6wjuggAAAABJRU5ErkJggg==';
    const buffer = Buffer.from(base64PNG, 'base64');
    fs.writeFileSync(testImagePath, buffer);
    
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath), {
      filename: 'test-image-1.png',
      contentType: 'image/png'
    });
    
    const uploadResponse = await axios.post('http://localhost:5000/api/v1/upload', form, {
      headers: form.getHeaders(),
      timeout: 30000
    });
    
    const isCloudinaryUrl = uploadResponse.data.data.url.includes('cloudinary.com');
    const hasPublicId = uploadResponse.data.data.public_id && uploadResponse.data.data.public_id.length > 0;
    
    logTest('Real Cloudinary Upload', 
      uploadResponse.data.success && isCloudinaryUrl && hasPublicId,
      `URL: ${uploadResponse.data.data.url}`
    );
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    
  } catch (error) {
    logTest('Real Cloudinary Upload', false, error.response?.data?.error || error.message);
  }
  
  // Test 3: File Type Validation
  try {
    const testTextPath = path.join(__dirname, 'test-file.txt');
    fs.writeFileSync(testTextPath, 'This is not an image');
    
    const form = new FormData();
    form.append('file', fs.createReadStream(testTextPath), {
      filename: 'test-file.txt',
      contentType: 'text/plain'
    });
    
    try {
      await axios.post('http://localhost:5000/api/v1/upload', form, {
        headers: form.getHeaders(),
        timeout: 30000
      });
      logTest('File Type Validation', false, 'Should have rejected non-image file');
    } catch (error) {
      const isCorrectError = error.response?.data?.error?.includes('Invalid file type');
      logTest('File Type Validation', isCorrectError, 
        isCorrectError ? 'Correctly rejected non-image file' : error.response?.data?.error || error.message);
    }
    
    // Cleanup
    if (fs.existsSync(testTextPath)) {
      fs.unlinkSync(testTextPath);
    }
    
  } catch (error) {
    logTest('File Type Validation', false, error.message);
  }
  
  // Test 4: Missing File Handling
  try {
    const response = await axios.post('http://localhost:5000/api/v1/upload', {});
    logTest('Missing File Handling', false, 'Should have failed without file');
  } catch (error) {
    const isCorrectError = error.response?.data?.error?.includes('No files were uploaded');
    logTest('Missing File Handling', isCorrectError,
      isCorrectError ? 'Correctly handled missing file' : error.response?.data?.error || error.message);
  }
  
  // Test 5: Multiple Image Upload Test
  try {
    const testImages = [];
    const uploadPromises = [];
    
    for (let i = 0; i < 3; i++) {
      const testImagePath = path.join(__dirname, `test-multi-${i}.png`);
      const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAGA6wjuggAAAABJRU5ErkJggg==';
      const buffer = Buffer.from(base64PNG, 'base64');
      fs.writeFileSync(testImagePath, buffer);
      testImages.push(testImagePath);
      
      const form = new FormData();
      form.append('file', fs.createReadStream(testImagePath), {
        filename: `test-multi-${i}.png`,
        contentType: 'image/png'
      });
      
      uploadPromises.push(axios.post('http://localhost:5000/api/v1/upload', form, {
        headers: form.getHeaders(),
        timeout: 30000
      }));
    }
    
    const results = await Promise.all(uploadPromises);
    const allSuccessful = results.every(r => r.data.success && r.data.data.url.includes('cloudinary.com'));
    const uniqueUrls = new Set(results.map(r => r.data.data.url));
    
    logTest('Multiple Image Upload', 
      allSuccessful && uniqueUrls.size === 3,
      allSuccessful ? `All 3 uploads successful with unique URLs` : 'Some uploads failed'
    );
    
    // Cleanup
    testImages.forEach(imagePath => {
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    });
    
  } catch (error) {
    logTest('Multiple Image Upload', false, error.message);
  }
  
  // Test 6: Large Image Handling
  try {
    // Create a larger image (larger base64 PNG)
    const testImagePath = path.join(__dirname, 'test-large.png');
    // This is a small PNG but we'll add some content to make it larger
    const largeContent = Buffer.alloc(50000, 0); // 50KB of zeros
    fs.writeFileSync(testImagePath, largeContent);
    
    const form = new FormData();
    form.append('file', fs.createReadStream(testImagePath), {
      filename: 'test-large.png',
      contentType: 'image/png'
    });
    
    const response = await axios.post('http://localhost:5000/api/v1/upload', form, {
      headers: form.getHeaders(),
      timeout: 60000 // Longer timeout for larger file
    });
    
    logTest('Large Image Handling', 
      response.data.success,
      response.data.success ? 'Large file handled successfully' : 'Large file upload failed'
    );
    
    // Cleanup
    if (fs.existsSync(testImagePath)) {
      fs.unlinkSync(testImagePath);
    }
    
  } catch (error) {
    logTest('Large Image Handling', false, error.response?.data?.error || error.message);
  }
  
  // Test Results Summary
  console.log('\n' + '=' .repeat(50));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('=' .repeat(50));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📋 Total:  ${results.tests.length}`);
  console.log(`📈 Success Rate: ${((results.passed / results.tests.length) * 100).toFixed(1)}%`);
  
  if (results.failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Image upload system is fully functional.');
  } else {
    console.log('\n⚠️  Some tests failed. Review the details above.');
  }
  
  // Detailed results
  console.log('\n📋 DETAILED RESULTS:');
  results.tests.forEach((test, index) => {
    console.log(`${index + 1}. ${test.name}: ${test.passed ? '✅ PASS' : '❌ FAIL'}`);
    if (test.details) {
      console.log(`   Details: ${test.details}`);
    }
  });
}

// Run the test
runComprehensiveUploadTest().catch(console.error);
