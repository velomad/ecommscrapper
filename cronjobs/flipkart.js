const cron = require("node-cron");
const flipkartScraper = require("../Scrappers/flipkart/scraper");
const myntraScraper = require("../Scrappers/myntra/scraper");
const { flipkartBaseUrl, myntraBaseUrl } = require("../config/keys");

cron.schedule("0 1 * * *", async () => {
	await flipkartScraper.scraper(flipkartBaseUrl, (data, response) => {
		if (response) {
			console.log(data);
			console.log("Done.");
		}
	});

	await myntraScraper.scraper(myntraBaseUrl, (data, response) => {
		if (response) {
			console.log(data);
			console.log("Done.");
		}
	});
});
