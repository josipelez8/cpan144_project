class TopicManager {
    constructor() {
        this.topicDatabase = new Map();
    }

    hasTopic(name) {
        if (this.topicDatabase.has(name)) {
            //console.log(`[TopicManager] Topic '${name}' already exists!`);
            return true;
        }

        return false;
    }
  
    // Function to register a new topic
    register(name, desc) {
        if (this.hasTopic(name)) return;

        this.topicDatabase.set(name, {
            about: desc,
            comments: []
        });
        console.log(`[TopicManager] Topic '${name}' registered successfully!`);
    }
  
    addComment(topicname, username, text) {
        if (!this.hasTopic(topicname)) return;

        let topic = this.topicDatabase.get(topicname);
        const userdata = global.server.userManager.userDatabase.get(username);

        topic.comments.push({
            name: userdata.name,
            text: text,
            color: userdata.color
        });

        this.topicDatabase.set(topicname, topic);
        return {comments: topic.comments};
    }

    getComments(topicname) {
        if (!this.hasTopic(topicname)) return;

        let topic = this.topicDatabase.get(topicname);
        return {comments: topic.comments};
    }

    getTopics() {
        let obj = {};
        for (const [key, value] of this.topicDatabase) {
            obj[key] = {about: value.about};
        }

        return obj;
    }

    getTopicsAbout(topicname) {
        if (!this.hasTopic(topicname)) return {desc: "Topic not found!"};
        return {desc: this.topicDatabase.get(topicname).about};
    }
}
  
module.exports = TopicManager;