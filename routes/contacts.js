const express = require('express');
const router = express.Router();
const mongo = require('../controllers/mongo.js');
const  ObjectId = require('mongodb').ObjectId;

router.use('/allDocuments', async (req, res) => {
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341").collection("contacts");

    const find = await col.find({}).toArray();

    res.send(find);
    client.close();
});

//format: ?id=xxxxxx
router.use('/findDocument', async (req, res) => {
    const id = ObjectId(req.query.id);
    const client = await mongo.connectToMongoDB();

    const col = client.db("cse341").collection("contacts");

    const find = await col.findOne({_id: id});
    res.send(find);
    client.close();
});

module.exports = router;