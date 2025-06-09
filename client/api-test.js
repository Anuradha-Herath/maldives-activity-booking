// Simple test script to verify API connectivity

const https = require('https');
const http = require('http');
const fetch = require('node-fetch');

// URLs to test
const BACKEND_URL = 'https://maldives-activity-booking-backend.onrender.com/api/v1/activities';
const LOCAL_API_PATH = 'http://localhost:3000/api/v1/activities';

async function testURL(url) {
    console.log(`Testing URL: ${url}`);
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            url,
            status: response.status,
            success: response.ok,
            data: data
        };
    } catch (error) {
        return {
            url,
            success: false,
            error: error.message
        };
    }
}

async function runTests() {
    console.log('== Starting API Connection Tests ==');
    
    try {
        console.log('\nTesting direct backend connection:');
        const backendResult = await testURL(BACKEND_URL);
        console.log(`Status: ${backendResult.status}`);
        console.log(`Success: ${backendResult.success}`);
        if (backendResult.success) {
            console.log(`Data received: ${JSON.stringify(backendResult.data).substring(0, 100)}...`);
        } else {
            console.log(`Error: ${backendResult.error}`);
        }

        console.log('\nTesting local proxy (if running):');
        const localResult = await testURL(LOCAL_API_PATH);
        console.log(`Status: ${localResult.status}`);
        console.log(`Success: ${localResult.success}`);
        if (localResult.success) {
            console.log(`Data received: ${JSON.stringify(localResult.data).substring(0, 100)}...`);
        } else {
            console.log(`Error: ${localResult.error}`);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
    
    console.log('\n== API Tests Complete ==');
}

runTests();
