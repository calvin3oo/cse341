const express = require('express');
const router = express.Router();
const mongo = require('../controllers/mongo.js');
const  ObjectId = require('mongodb').ObjectId;

const entrys = [
    { 
        name:"firstName", 
        required: true
    },
    { 
        name:"lastName", 
        required: true
    },
    { 
        name:"birthday", 
        required: true
    },
    { 
        name:"email", 
        required: true
    },
    { 
        name:"favoriteColor", 
        required: true
    }
];

router.get('/', async (req, res) => {
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341").collection("contacts");

    const find = await col.find({}).toArray();

    res.send(find);
    client.close();
});

router.get('/:docID', async (req, res) => {
    const id = ObjectId(req.params.docID);
    const client = await mongo.connectToMongoDB();

    const col = client.db("cse341").collection("contacts");

    const find = await col.findOne({_id: id});
    res.send(find);
    client.close();
});


/**
 * everything in the body is required.
 * inserts a new document into the "cse341" database, in the "contacts" collection
 * 
 * body format:
 * { 
 *  firstName: "name",
 *  lastName: "last",
 *  email: "email",
 *  favoriteColor: "color",
 *  birthday: "birthday"
 * }
 */
router.post('/', async (req, res) => {
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/addUser' }
    } */
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341").collection("contacts");
    var newDoc = {};

    entrys.forEach(entry => {
        if(!req.body[entry.name] && entry.required) throw new Error(`Missing Entry: ${entry.name}`);
        newDoc[entry.name] = req.body[entry.name];
    });

    const result = await col.insertOne(newDoc);

    res.send(result.insertedId);
    client.close();
});

//update a document with the ID provided
//the body contains the updates to the document
router.put('/:docID', async (req, res) => {
    /*  #swagger.parameters['obj'] = {
            in: 'body',
            description: 'body format',
            schema: { $ref: '#/definitions/updateUser' }
    } */
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341").collection("contacts");

    const filter = { _id : ObjectId(req.params.docID)};
    const update = {
        $set: req.body
    };

    const response = await col.updateOne(filter, update);

    res.sendStatus(200);
    client.close();
});

//update a document with the ID provided
//the body contains the updates to the document
router.delete('/:docID', async (req, res) => {
    const client = await mongo.connectToMongoDB();
    const col = client.db("cse341").collection("contacts");

    const filter = {_id : ObjectId(req.params.docID)};

    const response = await col.deleteOne(filter);

    res.sendStatus(200);
    client.close();
});

module.exports = router;