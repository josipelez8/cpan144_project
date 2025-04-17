const crypto = require('crypto');

class UserManager {
    constructor() {
        // A map to store usernames and their corresponding hashed passwords
        this.userDatabase = new Map();
    }
  
    // Function to hash the password (SHA-256)
    hashPassword(password) {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    }

    generateToken(length = 16) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0'))
            .join('')
            .slice(0, length);
    }
  
    // Function to register a new user with a hashed password
    registerUser(username, password) {
        if (this.userDatabase.has(username)) {
        console.log(`[UserManager] User '${username}' already exists!`);
            return;
        }
        const hashedPassword = this.hashPassword(password);
        this.userDatabase.set(username, {
            hashpass: hashedPassword, 
            token: hashedPassword, // disabled for debugging, use this.generateToken()
            name: username,
            birthday: '1990-01-01',
            color: '#e0f7fa'
        });
        console.log(`[UserManager] User '${username}' registered successfully!`);
        //console.log(`SERVER: ${this.userDatabase.get(username).token}`);
    }
  
    // Function to login by checking the hashed password
    loginUser(username, password) {
        let obj = {};

        if (!this.userDatabase.has(username)) {
            obj.message = `User '${username}' not found!`;
            obj.status = 404;
            console.log(`[UserManager] ${obj.message}`);
            return obj;
        }
        const objUser = this.userDatabase.get(username);
        const enteredHashedPassword = this.hashPassword(password);

        if (enteredHashedPassword === objUser.hashpass) {
            obj.message = `User '${username}' logged in successfully!`;
            obj.status = 200;
            obj.token = objUser.token;
        } else {
            obj.message = `User '${username}' failed to login! (Invalid Password)`;
            obj.status = 403;
        }

        console.log(`[UserManager] ${obj.message}`);
        return obj;
    }

    // Function to login by checking the token
    loginUserToken(username, token) {
        let obj = {};

        if (!this.userDatabase.has(username)) {
            obj.message = `User '${username}' not found!`;
            obj.status = 404;
            console.log(`[UserManager] ${obj.message}`);
            return obj;
        }
        const objUser = this.userDatabase.get(username);
        
        //console.log(`CLIENT: ${token} SERVER: ${objUser.token}`);

        if (token === objUser.token) {
            obj.message = `User '${username}' authenticated successfully!`;
            obj.status = 200;
        } else {
            obj.message = `User '${username}' failed to authenticate! (Invalid Token)`;
            obj.status = 403;
        }

        console.log(`[UserManager] ${obj.message}`);
        return obj;
    }
}
  
module.exports = UserManager;