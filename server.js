const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Create a simple HTTPS server
const server = https.createServer({
    key: fs.readFileSync('key.pem', 'utf8').catch(() => null),
    cert: fs.readFileSync('cert.pem', 'utf8').catch(() => null)
}, (req, res) => {
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
            '.json': 'application/json'
        };
        
        res.writeHead(200, {
            'Content-Type': contentTypes[ext] || 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    });
});

const PORT = 8443;
server.listen(PORT, () => {
    console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
