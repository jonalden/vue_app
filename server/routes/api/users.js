const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// GET users
router.get('/', async (req, res) => {
    const users = await loadUsersCollection();
    res.send(await users.find({}).toArray());
});

// CREATE users
router.post("/", async (req, res) => {
    const users = await loadUsersCollection();
    await users.insertOne({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date()
    });
    res.status(201).send();
})

// DELETE users
router.delete("/:id", async (req, res) => {
    const users = await loadUsersCollection();
    await users.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
})

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb+srv://jonAlden:!Q@W3e4r@cluster0-nfmpu.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db("vue_app").collection("users");
}

module.exports = router;