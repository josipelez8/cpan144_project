const LoginPostHandler   = require('../handlers/loginPostHandler');
const TokenPostHandler   = require('../handlers/tokenPostHandler');
const ProfilePostHandler = require('../handlers/profilePostHandler');
const TopicPostHandler = require('../handlers/topicPostHandler');

class PostManager {
    handle(req, res) {
        if (req.url === '/api/login') {
            const handler = new LoginPostHandler();
            handler.process(req, res);
        } else if (req.url === '/api/tokencheck') {
            const handler = new TokenPostHandler();
            handler.process(req, res);
        } else if (req.url === '/api/profile') {
            const handler = new ProfilePostHandler();
            handler.process(req, res);
        } else if (req.url === '/api/topic') {
            const handler = new TopicPostHandler();
            handler.process(req, res);
        } else {
            res.writeHead(404);
            res.end('Post route not found');
        }
    }
}

module.exports = PostManager;