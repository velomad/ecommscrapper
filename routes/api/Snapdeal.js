const express = require("express");
// const { MongoClient } = require("mongodb");
const router = express.Router();	
const snapdealScrapper = require("../../Scrappers/snapdeal/snapdealScrapper");
// const db = require("../../config/keys").mongoURI;

const { snapdealBaseUrl } = require("../../config/keys");

// const uri = db;

router.get("/", (req, res) => {
	console.log("starting to scrap...");
	snapdealScrapper.scraper(snapdealBaseUrl, (data, response) => {
		if (response) {
			console.log('SnapDeal ===============>',data);
			console.log('SnapDeal ===============>',data.length);

		}
	});
});

module.exports = router;
