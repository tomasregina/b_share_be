const db = require('../utils/database');

module.exports = class Item {
    constructor(title, description, pricePerDay, pricePerHour, user, userId, dateAdded) {
        this.title = title;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.pricePerHour = pricePerHour;
        this.user = user;
        this.userId = userId;
        this.dateAdded = dateAdded
    }
    async saveToDb() {
        const sql = 'INSERT INTO items SET ?';
        const values = {
            title: this.title,
            description: this.description,
            price_per_day: this.pricePerDay,
            price_per_hour: this.pricePerHour,
            user: this.user,
            user_id: this.userId,
            date_added: this.dateAdded
        }
        try {
            const newItem = await db.query(sql, values);
        }
        catch (e) {
            throw e;
        }
    }

    async getAllItems() {
        const sql = 'SELECT * FROM items';
        try {
            const allItems = await db.query(sql);
            console.log('allITems', allItems);
            return allItems;
        }
        catch (e) {
            throw e;
        }
    }
}
