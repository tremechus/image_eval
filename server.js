const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Request handler function
const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    const filePath = path.join(__dirname, pathname);
    
    // Simple file serving
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        
        // Set content type based on file extension
        const ext = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        };
        
        res.writeHead(200, {
            'Content-Type': contentTypes[ext] || 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    });
};

// Try to create HTTPS server first, fallback to HTTP
let server;
const HTTPS_PORT = 8443;
const HTTP_PORT = 8080;

try {
    // Try to read SSL certificates
    const key = fs.readFileSync('key.pem', 'utf8');
    const cert = fs.readFileSync('cert.pem', 'utf8');
    
    // Create HTTPS server if certificates exist
    server = https.createServer({ key, cert }, requestHandler);
    server.listen(HTTPS_PORT, () => {
        console.log(`✅ HTTPS Server running on https://localhost:${HTTPS_PORT}`);
        console.log(`🌐 Open https://localhost:${HTTPS_PORT} in your browser`);
    });
} catch (err) {
    // Fallback to HTTP server if no certificates
    console.log('📝 SSL certificates not found, starting HTTP server...');
    server = http.createServer(requestHandler);
    server.listen(HTTP_PORT, () => {
        console.log(`✅ HTTP Server running on http://localhost:${HTTP_PORT}`);
        console.log(`🌐 Open http://localhost:${HTTP_PORT} in your browser`);
    });
}
