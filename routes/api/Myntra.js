const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const MyntraURL = require("../../config/keys").myntraBaseUrl;
const myntraScrapper = require("../../Scrappers/myntra/scraper");
const db = require("../../config/keys").mongoURI;

const uri = db;

router.get("/", (req, res) => {
	const pagesToScrape = 1;
	var totalProdctsInserted = 0;

	console.log("starting to scrap...");
	myntraScrapper.scraper(
		MyntraURL,
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

						const database = client.db("myntra");
						const collection = database.collection(categoryCollection);

						// this option prevents additional documents from being inserted if one fails
						const options = { ordered: true };

						// if (
						// 	currentLoop === 0 &&
						// 	currentCategory === 0 &&
						// 	currentPage === 1
						// ) {
						// 	await collection.deleteMany();
						// }
						const result = await collection.insertMany(data, options);

						totalProdctsInserted += data.length;

						if (
							currentLoop === totalLoops &&
							currentCategory === totalCategory &&
							currentPage === pagesToScrape
						) {
							res.status(201).json({
								message: "Data Inserted.",
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
				console.log(currentLoop);
				console.log(currentCategory);
				console.log(currentPage);

				console.log("Done.");
			}
		},
	);
});

module.exports = router;
