const express = require ('express')
const { MongoClient } = require("mongodb");
const { OpenAI } = require("openai");

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

const database = client.db('listings');
const crops = database.collection('crops');

app.get('/listings', async (req, res) => {
    console.log("TEST")
    await client.connect();
    const thing = await crops.find({}).toArray();
    res.send(thing)

})

app.get('/recipe', async (req, res) => {
    try {
        await client.connect();
        const thing = await crops.find({}).toArray();
        const cropNames = thing.map(crop => crop.name);

        const url = "https://api.openai.com/v1/chat/completions";
        const bearer = 'Bearer ' + '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';

        console.log(cropNames.toString())

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
                        "content": "You are a recipe making tool. You will be given a list of ingredients separated by commas, and using only the first three things in the list, generate me a recipe idea"
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
        res.send(data.choices[0].message.content);

    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("An error occurred while processing your request.");
    } finally {
        await client.close();
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
