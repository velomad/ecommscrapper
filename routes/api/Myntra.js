const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const MyntraURL = require("../../config/keys").myntraBaseUrl;
const myntraScrapper = require("../../Scrappers/myntra/scraper");
const db = require("../../config/keys").mongoURI;

const uri = db;

router.get("/", (req, res) => {
	console.log("starting to scrap...");
	myntraScrapper.scraper(MyntraURL, (data, response, end) => {
		console.log(end);
		if (response) {
			const client = new MongoClient(uri, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
			});

			async function run() {
				try {
					await client.connect();

					const database = client.db("ScrappedData");
					const collection = database.collection("Myntra");

					// this option prevents additional documents from being inserted if one fails
					const options = { ordered: true };

					const result = await collection.insertMany(data, options);
					if (end === 10) {
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

			// console.log(data);
		}
	});
});

module.exports = router;
