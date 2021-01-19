const Item = require('../models/item');

exports.postAddItem = (req, res, next) => {
    const item = new Item(
        req.body.title,
        req.body.description,
        req.body.pricePerDay,
        req.body.pricePerHour,
        req.user.username,
        req.user.id,
        new Date().getTime()
    )
    try {
        const newItem = item.saveToDb();
        res.json({status: 'ok'});
        
    }
    catch (e) {
        console.log('e', e);
        res.json({status: 'error'});
    }
}

exports.getAllItems = async (req, res, next) => {
    const item = new Item();
    try {
        const allItems = await item.getAllItems();
        console.log('allItems');
        res.json({allItems: allItems[0]});
    }
    catch (e) {
        console.log('e', e);
        res.json({status: 'get all items error'});
    }
}