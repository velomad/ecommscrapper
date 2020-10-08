const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const flipkartScrapper = require("../../Scrappers/flipkart/scraper");
const db = require("../../config/keys").mongoURI;

const { flipkartBaseUrl } = require("../../config/keys");

const uri = db;

router.get("/", (req, res) => {
	console.log("starting to scrape...");
	flipkartScrapper.scraper(
		flipkartBaseUrl,
		(data, response, end, categoryCollection) => {
			if (response) {
				const client = new MongoClient(uri, {
					useUnifiedTopology: true,
					useNewUrlParser: true,
				});

				async function run() {
					try {
						await client.connect();

						const database = client.db("flipkart");
						const collection = database.collection(
							JSON.stringify(categoryCollection).slice(2, -2).replace(" ", "-"),
						);

						// this option prevents additional documents from being inserted if one fails
						const options = { ordered: true };
						const result = await collection.insertMany(data, options);
						if (end === 2) {
							res.status(201).json({
								message: "Data Insrted.",
								result: data,
							});
						}
						console.log(`${result.insertedCount} documents were inserted`);
					} finally {
						await client.close();
					}
				}
				run().catch(console.dir);
				console.log(data);
				console.log("Done.");
			}
		},
	);
});
module.exports = router;
