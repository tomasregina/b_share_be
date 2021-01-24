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

exports.getAllItemsCount = async (req, res, next) => {
    const item = new Item();
    try {
        const allItemsCount = await item.getAllItemsCount();
        res.json({allItemsCount: allItemsCount[0][0].allItemsCount});
    }
    catch (e) {
        console.log('e', e);
        res.json({status: 'get all items error'});
    }
}

exports.loadItems = async (req, res, next) => {
    const item = new Item();
    // const limit = req.body.itemsOnPage;
    // const offset = Number.parseInt(req.body.pageNumber, 10) === 1 ? 0 : req.body.pageNumber * 10;
    const limit = req.query.limit;
    const offset = Number.parseInt(req.query.offset, 10) === 1 ? 0 : Number.parseInt(req.query.offset,10) + 10; 
    try {
        const loadedItems = await item.loadItems(limit, offset);
        res.json({loadedItems: loadedItems});
    }
    catch (e) {
        console.log('e', e);
    }
    console.log('aaaaaaa');
}