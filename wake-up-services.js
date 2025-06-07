// Wake up Render services script
const potentialBackendURLs = [
    'https://maldives-activity-booking-backend.onrender.com',
    'https://maldives-activity-booking-api.onrender.com'
];

async function wakeUpService(url) {
    console.log(`🔄 Attempting to wake up: ${url}`);
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors'
        });
        
        if (response.ok) {
            console.log(`✅ ${url} is awake and responding`);
            return true;
        } else {
            console.log(`⚠️ ${url} responded with status: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ${url} failed to respond: ${error.message}`);
        return false;
    }
}

async function wakeUpAllServices() {
    console.log('🚀 Waking up Render services...');
    
    for (const url of potentialBackendURLs) {
        await wakeUpService(url);
        // Wait 5 seconds between attempts
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    console.log('✅ Wake-up process completed');
}

// Run the wake-up process
wakeUpAllServices();
