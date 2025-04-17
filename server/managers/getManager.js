class GetManager {
    handle(req, res) {
        res.writeHead(404);
        res.end('GET Not Found');
    }
}

module.exports = GetManager;