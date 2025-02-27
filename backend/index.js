const express = require ('express')
const { MongoClient, ObjectId } = require("mongodb");
const { OpenAI } = require("openai");
const { marked } = require("marked")

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


const uri = "mongokey";
const client = new MongoClient(uri);

const database = client.db('listings');
const crops = database.collection('crops');

app.get('/listings', async (req, res) => {
    await client.connect();
    const thing = await crops.find({}).toArray();
    res.send(thing)

})

app.get('/recipe', async (req, res) => {
    try {
        await client.connect();
        const thing = (await crops.find({}).toArray());
        thing.sort((a, b) => b.quantity - a.quantity);

        const cropNames = thing.map(crop => crop.name);

        const url = "https://api.openai.com/v1/chat/completions";
        const bearer = 'Bearer ' + 'gpt-key';

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system", 
                        "content": "You are a recipe making tool. You will be given a list of ingredients separated by commas, and using only the first things in the list, generate a recipe idea. Format it as a list with a bolded title, a section for ingredients, and a section for steps."
                    },
                    {
                        "role": "user", 
                        "content": cropNames.toString(),
                    }
                ],
                "max_tokens": 4096,
                "temperature": 1,
                "top_p": 1,
                "n": 1,
                "stream": false,
                "logprobs": null,
            })
        });

        let data = await response.json(); 
        res.send(marked.parse(data.choices[0].message.content))

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("An error occurred while processing your request.");
    } finally {
        await client.close();
    }
});

app.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    if(!ObjectId.isValid(id)) {
        console.log('Error with Id')
    }
    try {
        const result = await crops.updateOne(
            { _id: ObjectId.createFromHexString(id)},
            { $set: {quantity: quantity} }
        );
        if(result.matchedCount == 0) res.status(404).json({ error: 'Document not found'});
        else res.status(200).json({ message: 'Document updated'})
    } catch (error) {
        console.error('Error', error);
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
