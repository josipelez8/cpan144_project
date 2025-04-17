const http = require('http');
const PostManager = require('./managers/postManager');
const OptionManager = require('./managers/optionManager');
const GetManager = require('./managers/getManager');
const UserManager = require('./managers/userManager');
const TopicManager = require('./managers/topicManager');

class Server {
    constructor(port) {
        this.port = port;
        this.http = null;

        this.postManager = new PostManager();
        this.optionManager = new OptionManager();
        this.getManager = new GetManager();

        this.userManager = new UserManager();
        this.topicManager = new TopicManager();
    }

    initialize() {
        this.userManager.registerUser("user1", "password1");
        this.userManager.registerUser("user2", "password2");
        this.userManager.registerUser("user3", "password3");

        this.topicManager.register("Cute", "Adorable animals and heartwarming moments");
        this.topicManager.register("Sports", "Latest scores, highlights, and athlete news");
        this.topicManager.register("Technology", "Innovations, gadgets, and tech trends");
        this.topicManager.register("News", "Breaking headlines and current events");
        this.topicManager.register("Funny", "Memes, jokes, and viral humor");

        this.http = http.createServer((req, res) => {
            if (req.method === 'POST') {
                this.postManager.handle(req, res);
            } else if (req.method === 'OPTIONS') {
                this.optionManager.handle(req, res);
            } else if (req.method === 'GET') {
                this.getManager.handle(req, res);
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        });
          
        this.http.listen(this.port, () => {
            console.log(`[Server] Instant Connect server is running at http://localhost:${this.port}`);
        });
    }
  }
  
  module.exports = Server;