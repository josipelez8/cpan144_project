const Server = require('./server');

global.server = new Server(4000);
global.server.initialize();