class ProfilePostHandler {
    process(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                console.log('[ProfilePostHandler] Received:', parsed);
                
                let obj = global.server.userManager.loginUserToken(parsed.username, parsed.token);

                if (obj.status === 200) {
                    let data = global.server.userManager.userDatabase.get(parsed.username);

                    if (parsed.set !== null) {
                        data.name = parsed.set.name;
                        data.birthday = parsed.set.birthday;
                        data.color = parsed.set.color;

                        global.server.userManager.userDatabase.set(parsed.username, data);

                        obj = {message: "Updated profile!", status: 400};
                    } else {
                        obj = {
                            name: data.name,
                            birthday: data.birthday,
                            color: data.color
                        };
                    }
                }

                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });

                res.end(JSON.stringify(obj));
            } catch (err) {
                console.log(err);
                res.writeHead(400, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
}

module.exports = ProfilePostHandler;