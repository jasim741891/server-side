const express = require('express');
const app = express();
const cors = require('cors')
const { MongoClient, Collection } = require('mongodb');
require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const port = 5000;
// medilWear
app.use(cors());
app.use(express.json())


// user : mymongodbuser1
// password: GP6QVShpdvAqXQa8


// const uri = "mongodb+srv://mymongodbuser1:GP6QVShpdvAqXQa8@cluster0.peaym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.peaym.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();

        const database = client.db("travel");
        const usersCollection = database.collection("users");
        // GET  API
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        // SINGLE GET API
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.findOne(query)
            console.log('using id', id)
            res.send(user)
        })


        // POST API
        app.post('/users', async (req, res) => {
            const service = req.body;
            console.log('hiting', service)
            const result = await usersCollection.insertOne(service)
            console.log(result)
            res.json(result)
            // const service = {
            //     "name": "ENGINE DIAGNOSTIC",
            //     "price": "300",
            //     "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
            //     "img": "https://i.ibb.co/dGDkr4v/1.jpg"
            // }


            //     console.log("hiting", req.body);



        });

        // // updated api 
        // app.put('/users/:id', async (req, res) => {
        //     const id = req.params.id
        //     const updatedUser = req.body
        //     const filter = { _id: ObjectId(id) }
        //     const options = { upsert: true }
        //     const updateDoc = {
        //         $set: {
        //             name: updatedUser.name,
        //             email: updatedUser.email
        //         },
        //     };
        //     const result = await usersCollection.updateOne(filter, updateDoc, options)
        //     console.log('updateding users', id)
        //     res.json(result)
        // })


        // Delete api
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            console.log('deleteing', result)
            res.json(result)
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Running my jasim uddin')
});
app.listen(port, () => {
    console.log('Running server', port)

})

