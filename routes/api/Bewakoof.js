const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const bewakoofScrapper = require("../../Scrappers/bewakoof/scraper");
const db = require("../../config/keys").mongoURI;
const { bewakoofBaseUrl } = require("../../config/keys");

const uri = db;

router.get("/", (req, res) => {
	console.log("starting to scrap...");
	bewakoofScrapper.scraper(
		bewakoofBaseUrl,
		(data, response, category) => {
			if (response) {
				const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true, });

				async function run() {
				    try {
				        await client.connect();

				        const database = client.db("snapdeal");
				        const collection = database.collection(category);

				        // this option prevents additional documents from being inserted if one fails
				        const options = { ordered: true };

				        const result = await collection.insertMany(data, options);
				        console.log(`${result.insertedCount} documents were inserted`);
				    } finally {
				        await client.close();
				    }
				}
				run().catch(console.dir);
				console.log(data);
				console.log(data.length);
			}
		},
	);
});

module.exports = router;
