const db = require('../utils/database');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const passport = require('passport');
const mysql = require('mysql2');

module.exports = class User {
    constructor(username, email, password, address) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
    }
    async findOne(email) {
        const sql = 'SELECT * FROM users WHERE email = ' + mysql.escape(email);
        try {
            const user = await db.query(sql);
            
            return user[0][0];
        }
        catch (e) {
            throw e
        }
    }


    async saveToDb() {
        const sql = 'INSERT INTO users  SET ?';
        const passwordHash = bcrypt.hashSync(this.password, 10);
        const values = {
            username: this.username, 
            email: this.email, 
            password: passwordHash, 
            address: this.address  
        };
        try {
            const newUser = await db.query(sql,values);
            return newUser;
        }   
        catch (e) {
            throw e;
        }
    }

    async addItem(itemInfo) {
        const sql = 'INSERT INTO items SET ?';
        try {
            const newItem = await db.query(sql, itemInfo);
            return newItem;
        }
        catch (e) {
            throw e;
        }

    }
}