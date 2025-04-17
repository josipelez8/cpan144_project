class TopicPostHandler {
    process(req, res) {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const parsed = JSON.parse(body);
                console.log('[TopicPostHandler] Received:', parsed);
                
                let obj = global.server.userManager.loginUserToken(parsed.username, parsed.token);

                if (obj.status === 200) {
                    if (parsed.action == "getTopics") {
                        obj = global.server.topicManager.getTopics();
                    } else if (parsed.action == "getTopicsAbout" && parsed.topic) {
                        obj = global.server.topicManager.getTopicsAbout(parsed.topic);
                    } else if (parsed.action == "sendmsg" && parsed.topic && parsed.text) {
                        obj = global.server.topicManager.addComment(parsed.topic, parsed.username, parsed.text);
                    } else if (parsed.action == "getmsg" && parsed.topic) {
                        obj = global.server.topicManager.getComments(parsed.topic);
                    } else {
                        obj = {};
                    }
                } else {
                    obj = {};
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

module.exports = TopicPostHandler;