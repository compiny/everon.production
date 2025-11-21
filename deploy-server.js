// deploy-server.js
const http = require('http');
const { exec } = require('child_process');
const crypto = require('crypto');

const SECRET = 'your-github-secret';

http.createServer((req, res) => {
  if (req.url === '/github-webhook' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const sig = req.headers['x-hub-signature-256'];
      const hmac = crypto.createHmac('sha256', SECRET);
      const digest = 'sha256=' + hmac.update(body).digest('hex');
      
      if (sig === digest) {
        exec('sh /home/deployer/deploy.sh', (error, stdout, stderr) => {
          console.log(stdout);
          console.error(stderr);
        });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Deployment triggered\n');
      } else {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden\n');
      }
    });
  }
}).listen(9000);
