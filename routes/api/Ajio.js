const express = require("express");
// const { MongoClient } = require("mongodb");
const router = express.Router();
const ajioScrapper = require("../../Scrappers/ajioScrapper");
// const db = require("../../config/keys").mongoURI;

const { ajioBaseUrl } = require("../../config/keys");

// const uri = db;

router.get("/", (req, res) => {
	console.log("starting to scrap...");
	ajioScrapper.scraper(ajioBaseUrl, (data, response) => {
		if (response) {
			// const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true, });

			// async function run() {
			//     try {
			//         await client.connect();

			//         const database = client.db("ScrappedData");
			//         const collection = database.collection("Myntra");

			//         // this option prevents additional documents from being inserted if one fails
			//         const options = { ordered: true };

			//         const result = await collection.insertMany(data, options);
			//         console.log(`${result.insertedCount} documents were inserted`);
			//     } finally {
			//         await client.close();
			//     }
			// }
			// run().catch(console.dir);
			console.log(data);
			console.log(data.length);
		}
	});
});

module.exports = router;
