const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const flipkartScrapper = require("../../Scrappers/flipkart/scraper");
const db = require("../../config/keys").mongoURI;

const { flipkartBaseUrl } = require("../../config/keys");

const uri = db;

router.get("/", (req, res) => {
	const pagesToScrape = 8;
	var totalProdctsInserted = 0;

	console.log("starting to scrape...");
	flipkartScrapper.scraper(
		flipkartBaseUrl,
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
						const collection = database.collection("products");

						// this option prevents additional documents from being inserted if one fails
						const options = { ordered: true };
						// const result = await collection.insertMany(data, options);

						totalProdctsInserted += data.length;

						if (
							currentLoop === totalLoops &&
							currentCategory === totalCategory &&
							currentPage === pagesToScrape
						) {
							res.status(201).json({
								message: "Data Insrted.",
								results: totalProdctsInserted,
							});
						}
						// console.log(`${result.insertedCount} documents were inserted`);
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
