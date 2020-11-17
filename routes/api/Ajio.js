const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const ajioScrapper = require("../../Scrappers/ajio/scraper");
const db = require("../../config/keys").mongoURI;

const { ajioBaseUrl } = require("../../config/keys");

const uri = db;

router.get("/", (req, res) => {

	var pagesToScrape = 5;
	var totalProdctsInserted = 0;

	console.log("starting to scrap...");
	ajioScrapper.scraper(
		ajioBaseUrl,
		pagesToScrape,
		(
			data,
			response,
			currentLoop,
			totalLoops,
			currentCategory,
			totalCategory,
			currentPage,
			categoryCollection,
		) => {
			if (response) {
				const client = new MongoClient(uri, {
					useUnifiedTopology: true,
					useNewUrlParser: true,
				});
				async function run() {
					try {
						await client.connect();

						const database = client.db("webscrape");
						// const collection = database.collection(
						// 	JSON.stringify(categoryCollection)
						// 		.slice(2, -2)
						// 		.replace(/\s/g, ""),
						// );
						const collection = database.collection("products");
						// this option prevents additional documents from being inserted if one fails
						const options = { ordered: true };

						const result = await collection.insertMany(data, options);
						if (
							currentLoop === totalLoops &&
							currentCategory === totalCategory &&
							currentPage === pagesToScrape
						)  {
							res.status(201).json({
								message: "Data Insrted.",
								results: totalProdctsInserted,
							});
						}
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
