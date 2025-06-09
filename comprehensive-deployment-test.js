// Deployment Verification Script
// This script tests the deployed application and provides specific recommendations

class DeploymentTester {
    constructor() {
        this.frontendURL = 'https://maldives-activity-booking-frontend.onrender.com';
        this.potentialBackendURLs = [
            'https://maldives-activity-booking-backend.onrender.com',
            'https://maldives-activity-booking-api.onrender.com',
            'https://maldives-activity-booking-server.onrender.com'
        ];
        this.workingBackendURL = null;
        this.issues = [];
        this.recommendations = [];
    }

    async testService(url, timeout = 30000) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            return {
                success: response.ok,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                data: response.ok ? await response.json().catch(() => null) : null
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                isTimeout: error.name === 'AbortError'
            };
        }
    }

    async findWorkingBackend() {
        console.log('🔍 Searching for working backend...');
        
        for (const url of this.potentialBackendURLs) {
            console.log(`Testing: ${url}`);
            
            // Test root endpoint
            const rootTest = await this.testService(url);
            if (rootTest.success) {
                console.log(`✅ Found working backend: ${url}`);
                this.workingBackendURL = url;
                return url;
            } else {
                console.log(`❌ ${url} failed: ${rootTest.error || rootTest.status}`);
                if (rootTest.isTimeout) {
                    this.issues.push(`Backend ${url} is likely sleeping (timeout after 30s)`);
                }
            }
        }
        
        this.issues.push('No working backend URL found');
        return null;
    }

    async testBackendEndpoints() {
        if (!this.workingBackendURL) {
            this.issues.push('Cannot test backend endpoints - no working backend found');
            return;
        }

        const endpoints = [
            '/api/v1/server-status',
            '/api/v1/activities'
        ];

        for (const endpoint of endpoints) {
            const url = this.workingBackendURL + endpoint;
            console.log(`Testing endpoint: ${url}`);
            
            const result = await this.testService(url);
            if (result.success) {
                console.log(`✅ ${endpoint} working`);
                if (endpoint === '/api/v1/activities' && result.data) {
                    console.log(`   Activities count: ${result.data.count || 'unknown'}`);
                }
            } else {
                console.log(`❌ ${endpoint} failed: ${result.error || result.status}`);
                this.issues.push(`Backend endpoint ${endpoint} not responding properly`);
            }
        }
    }

    async testFrontend() {
        console.log('🌐 Testing frontend...');
        
        const frontendTest = await this.testService(this.frontendURL);
        if (frontendTest.success) {
            console.log('✅ Frontend is accessible');
        } else {
            console.log('❌ Frontend is not accessible');
            this.issues.push('Frontend not accessible');
        }
    }

    async testCORS() {
        if (!this.workingBackendURL) return;
        
        console.log('🔒 Testing CORS configuration...');
        
        try {
            const response = await fetch(`${this.workingBackendURL}/api/v1/activities`, {
                method: 'OPTIONS',
                mode: 'cors',
                headers: {
                    'Origin': this.frontendURL,
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'Content-Type'
                }
            });

            const allowOrigin = response.headers.get('Access-Control-Allow-Origin');
            if (allowOrigin === this.frontendURL || allowOrigin === '*') {
                console.log('✅ CORS properly configured');
            } else {
                console.log('❌ CORS not configured for frontend domain');
                this.issues.push(`CORS not allowing ${this.frontendURL}`);
                this.recommendations.push(`Update backend CORS_ORIGIN to include ${this.frontendURL}`);
            }
        } catch (error) {
            console.log('❌ CORS test failed:', error.message);
            this.issues.push('CORS test failed');
        }
    }

    generateRecommendations() {
        if (!this.workingBackendURL) {
            this.recommendations.push('Deploy backend service or check service name in Render dashboard');
            this.recommendations.push('If using free tier, try waking up the service by accessing it multiple times');
            this.recommendations.push('Check Render deployment logs for backend service errors');
        } else {
            // Check if frontend is using the correct backend URL
            const expectedAPIURL = this.workingBackendURL + '/api/v1';
            this.recommendations.push(`Update frontend VITE_API_URL to: ${expectedAPIURL}`);
            this.recommendations.push(`Update render.yaml frontend envVars to point to: ${expectedAPIURL}`);
        }

        if (this.issues.some(issue => issue.includes('timeout') || issue.includes('sleeping'))) {
            this.recommendations.push('Consider upgrading to Render paid tier to avoid service sleeping');
            this.recommendations.push('Implement a keep-alive mechanism to ping services regularly');
        }
    }

    async runComprehensiveTest() {
        console.log('🚀 Starting comprehensive deployment test...');
        console.log('================================================');
        
        await this.testFrontend();
        await this.findWorkingBackend();
        await this.testBackendEndpoints();
        await this.testCORS();
        
        this.generateRecommendations();
        
        console.log('\n📋 TEST SUMMARY');
        console.log('===============');
        
        if (this.workingBackendURL) {
            console.log(`✅ Working Backend: ${this.workingBackendURL}`);
        } else {
            console.log('❌ No working backend found');
        }
        
        if (this.issues.length > 0) {
            console.log('\n🚨 ISSUES DETECTED:');
            this.issues.forEach((issue, index) => {
                console.log(`${index + 1}. ${issue}`);
            });
        }
        
        if (this.recommendations.length > 0) {
            console.log('\n💡 RECOMMENDATIONS:');
            this.recommendations.forEach((rec, index) => {
                console.log(`${index + 1}. ${rec}`);
            });
        }
        
        console.log('\n🎯 NEXT STEPS:');
        if (this.workingBackendURL) {
            console.log('1. Update frontend environment variables with correct backend URL');
            console.log('2. Redeploy frontend with updated configuration');
            console.log('3. Test the application again');
        } else {
            console.log('1. Check Render dashboard for actual service URLs');
            console.log('2. Verify backend deployment status and logs');
            console.log('3. Wake up sleeping services if using free tier');
            console.log('4. Re-run this test after backend is confirmed working');
        }
        
        return {
            workingBackendURL: this.workingBackendURL,
            issues: this.issues,
            recommendations: this.recommendations
        };
    }
}

// Run the test
const tester = new DeploymentTester();
tester.runComprehensiveTest().then(results => {
    console.log('\n✅ Test completed!');
    console.log('Results:', results);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeploymentTester;
}
