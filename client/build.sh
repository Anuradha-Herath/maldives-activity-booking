#!/bin/bash

# Navigate to client directory
cd client

# Install dependencies
npm install

# Build the client
npm run build

# Create index.css in the dist root that references the actual CSS file
cat > dist/index.css << EOL
/* This file is a simple redirect to the actual CSS file */
@import url('/assets/css/main.css');
EOL

# Create .htaccess file in dist directory for proper MIME types
cat > dist/.htaccess << EOL
<IfModule mod_mime.c>
    AddType text/css .css
    AddType application/javascript .js
</IfModule>

<IfModule mod_headers.c>
    <FilesMatch "\\.css$">
        Header set Content-Type "text/css"
    </FilesMatch>
    <FilesMatch "\\.js$">
        Header set Content-Type "application/javascript"
    </FilesMatch>
</IfModule>
EOL

# Create _headers file for Netlify/Render static deployments
cat > dist/_headers << EOL
# All CSS files should have the correct MIME type
/*.css
  Content-Type: text/css; charset=UTF-8

# All JavaScript files should have the correct MIME type
/*.js
  Content-Type: application/javascript; charset=UTF-8
EOL

# Return to original directory
cd ..

echo "Build completed successfully!"
