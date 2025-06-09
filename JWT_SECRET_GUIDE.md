# JWT Secret Key Guide

## What is JWT_SECRET?

JWT_SECRET is a secret key used to sign and verify JSON Web Tokens (JWTs) for authentication. It acts like a private signature that ensures:

1. The token was created by your server
2. The token hasn't been tampered with
3. The token is legitimate and can be trusted

## How to Generate a Secure JWT_SECRET

### Option 1: Using Node.js (Recommended)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Example output:
```
fde9fa8d6d0c599dc290d8937edcce25b6e3865bdc696106ac3a52ea159d2e14
```

### Option 2: Using an Online Generator
You can use a secure random string generator. However, for production use, it's safer to generate it locally.

### Option 3: Generate with OpenSSL
```bash
openssl rand -hex 32
```

## Setting the JWT_SECRET in Different Environments

### 1. For Local Development
Add to your `.env` file:
```
JWT_SECRET=your_generated_secret_key
```

### 2. For Render Deployment
1. Go to your Render dashboard
2. Select your web service
3. Click on "Environment"
4. Add a new environment variable:
   - Key: `JWT_SECRET`
   - Value: Paste your generated secret

### 3. For Netlify Deployment
1. Go to your Netlify site dashboard
2. Navigate to Site settings > Build & deploy > Environment
3. Click "Edit variables"
4. Add a new variable:
   - Key: `JWT_SECRET`
   - Value: Paste your generated secret

### 4. For Heroku
```bash
heroku config:set JWT_SECRET=your_generated_secret_key
```

## Important Security Considerations

1. **Never commit your JWT_SECRET to version control**
2. **Use different JWT_SECRET values for development and production**
3. **Periodically rotate your JWT_SECRET in production**
4. **Make it sufficiently long (at least 32 characters)**
5. **Keep your JWT_SECRET confidential - treat it like a password**

## Example .env File for Development

```
# Authentication
JWT_SECRET=fde9fa8d6d0c599dc290d8937edcce25b6e3865bdc696106ac3a52ea159d2e14
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# CORS settings
CORS_ORIGIN=http://localhost:3000,http://localhost:5173

# Other settings
NODE_ENV=development
PORT=5000
```
