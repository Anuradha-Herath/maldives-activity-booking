/**
 * Cloudinary Configuration Helper
 * 
 * This script helps verify and update Cloudinary configuration in your .env file.
 * Run this with Node.js to check if your Cloudinary setup is working properly.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { promisify } = require('util');
const dotenv = require('dotenv');

// Try to load existing .env file
const envPath = path.join(__dirname, 'server', '.env');
const envExists = fs.existsSync(envPath);

// Load environment variables from .env if it exists
if (envExists) {
  dotenv.config({ path: envPath });
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = promisify(rl.question).bind(rl);

// Function to update .env file
async function updateEnvFile(cloudName, apiKey, apiSecret) {
  try {
    // Read existing .env content or create empty string if file doesn't exist
    let envContent = '';
    if (envExists) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }

    // Parse existing content to identify what needs to be updated
    const envVars = {};
    if (envContent) {
      envContent.split('\n').forEach(line => {
        if (line && !line.startsWith('#')) {
          const parts = line.split('=');
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join('=').trim();
            envVars[key] = value;
          }
        }
      });
    }

    // Update Cloudinary variables
    envVars['CLOUDINARY_CLOUD_NAME'] = cloudName;
    envVars['CLOUDINARY_API_KEY'] = apiKey;
    envVars['CLOUDINARY_API_SECRET'] = apiSecret;

    // Convert back to string format
    const newEnvContent = Object.entries(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Write the updated content back to .env
    fs.writeFileSync(envPath, newEnvContent);
    
    console.log('\n✅ Cloudinary configuration updated successfully in .env file.');
    
  } catch (error) {
    console.error('❌ Error updating .env file:', error);
  }
}

// Function to test Cloudinary configuration
async function testCloudinaryConfig(cloudName, apiKey, apiSecret) {
  try {
    // Only import cloudinary if we have configuration to test
    const cloudinary = require('cloudinary').v2;
    
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret
    });
    
    console.log('\nTesting Cloudinary configuration...');
    
    // Test the configuration with a ping request
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary configuration is working!');
    console.log('Result:', result);
    return true;
  } catch (error) {
    console.error('❌ Cloudinary configuration test failed:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('🌩️ Cloudinary Configuration Helper 🌩️');
  console.log('=====================================\n');
  
  // Check for existing configuration
  const existingCloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const existingApiKey = process.env.CLOUDINARY_API_KEY;
  const existingApiSecret = process.env.CLOUDINARY_API_SECRET;
  
  console.log('Current Cloudinary Configuration:');
  console.log(`- Cloud Name: ${existingCloudName || '❌ Not set'}`);
  console.log(`- API Key: ${existingApiKey ? '✅ Set' : '❌ Not set'}`);
  console.log(`- API Secret: ${existingApiSecret ? '✅ Set' : '❌ Not set'}`);
  
  const hasExistingConfig = existingCloudName && existingApiKey && existingApiSecret;
  
  // If we have existing config, test it first
  if (hasExistingConfig) {
    const isWorking = await testCloudinaryConfig(existingCloudName, existingApiKey, existingApiSecret);
    
    if (isWorking) {
      const updateAnyway = await question('\nYour Cloudinary configuration is working. Do you want to update it anyway? (y/N): ');
      if (updateAnyway.toLowerCase() !== 'y') {
        console.log('\n✅ Your Cloudinary configuration is ready to use!');
        rl.close();
        return;
      }
    } else {
      console.log('\nYour existing Cloudinary configuration is not working. Let\'s update it.');
    }
  }
  
  // Prompt for new configuration
  console.log('\nPlease enter your Cloudinary credentials:');
  
  const cloudName = await question(`Cloud Name${existingCloudName ? ` (${existingCloudName})` : ''}: `);
  const apiKey = await question(`API Key${existingApiKey ? ' (currently set)' : ''}: `);
  const apiSecret = await question(`API Secret${existingApiSecret ? ' (currently set)' : ''}: `);
  
  // Use existing values if not provided
  const finalCloudName = cloudName || existingCloudName || '';
  const finalApiKey = apiKey || existingApiKey || '';
  const finalApiSecret = apiSecret || existingApiSecret || '';
  
  if (!finalCloudName || !finalApiKey || !finalApiSecret) {
    console.log('\n❌ Error: All Cloudinary credentials are required. Please provide missing values.');
    rl.close();
    return;
  }
  
  // Test the new configuration
  const isNewConfigWorking = await testCloudinaryConfig(finalCloudName, finalApiKey, finalApiSecret);
  
  if (isNewConfigWorking) {
    // Update the .env file with the new configuration
    const shouldUpdate = await question('\nDo you want to update your .env file with this configuration? (Y/n): ');
    
    if (shouldUpdate.toLowerCase() !== 'n') {
      await updateEnvFile(finalCloudName, finalApiKey, finalApiSecret);
    }
  } else {
    console.log('\n❌ The provided Cloudinary configuration is not working. Please check your credentials.');
    
    const saveAnyway = await question('Do you want to save this configuration anyway? (y/N): ');
    if (saveAnyway.toLowerCase() === 'y') {
      await updateEnvFile(finalCloudName, finalApiKey, finalApiSecret);
    }
  }
  
  rl.close();
}

// Run the main function
main().catch(error => {
  console.error('Error:', error);
  rl.close();
});
