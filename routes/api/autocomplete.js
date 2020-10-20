const express = require("express");
const { MongoClient } = require("mongodb");
const router = express.Router();
const categories = require("../data/autocomplete");
const db = require("../../config/keys").mongoURI;

const uri = db;

router.get("/", (req, res) => {
	const client = new MongoClient(uri, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});

	async function run() {
		try {

			await client.connect();

			const database = client.db("webscrape");
			const collection = database.collection("category");

			// this option prevents additional documents from being inserted if one fails
			const options = { ordered: true };

			const result = await collection.insertMany(categories, options);

			res.status(201).json({
				message: "Data Inserted.",
				results: result,
			});

			console.log(`${result.insertedCount} documents were inserted`);
		} finally {
			await client.close();
		}
	}
	run().catch(console.dir);
});

module.exports = router;
