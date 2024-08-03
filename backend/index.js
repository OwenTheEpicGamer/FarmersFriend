const express = require ('express')
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {   
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    express.json();
    next();
  });


const uri = "mongodb+srv://owenguo66:8OKpiSSDfEJupMCq@farmerfriend.rribdlm.mongodb.net/";
const client = new MongoClient(uri);

app.get('/listings', async (req, res) => {
    console.log("TEST")
    await client.connect();
    const database = client.db('listings');
    const crops = database.collection('crops');
    const thing = await crops.find({}).toArray();
    res.send(thing)

})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
