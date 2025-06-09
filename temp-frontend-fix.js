// Temporary frontend fix to use old routes
// This script modifies the .env.production file to use old routes temporarily

const fs = require('fs');
const path = require('path');

// Path to the frontend .env.production file
const envFilePath = path.join(__dirname, 'client', '.env.production');

// Read the current content
fs.readFile(envFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  console.log('Current .env.production content:');
  console.log(data);

  // Update the API URL to use the old routes (without /api/v1)
  const updatedContent = data.replace(
    /VITE_API_URL=https:\/\/maldives-activity-booking-backend\.onrender\.com\/api\/v1/g,
    'VITE_API_URL=https://maldives-activity-booking-backend.onrender.com'
  );

  // Write the updated content back to the file
  fs.writeFile(envFilePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('\nUpdated .env.production content:');
    console.log(updatedContent);
    console.log('\n✅ TEMPORARY FIX APPLIED! The frontend will now use the old routes without /api/v1.');
    console.log('⚠️ Remember to revert this change once the backend is properly updated with /api/v1 routes.');
    console.log('\n🔧 NEXT STEPS:');
    console.log('1. Deploy the updated frontend');
    console.log('2. Activities should now load correctly');
    console.log('3. Continue working on fixing the backend to support /api/v1 routes');
  });
});
