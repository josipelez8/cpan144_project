class LoginPostHandler {
    process(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                console.log('[LoginPostHandler] Received:', parsed);
                
                const obj = global.server.userManager.loginUser(parsed.username, parsed.password);

                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });

                res.end(JSON.stringify(obj));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
}

module.exports = LoginPostHandler;