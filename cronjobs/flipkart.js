const cron = require("node-cron");
const flipkartScraper = require("../Scrappers/flipkart/scraper");
const myntraScraper = require("../Scrappers/myntra/scraper");
const { flipkartBaseUrl, myntraBaseUrl } = require("../config/keys");

const tst = 1
cron.schedule(`${tst} * * * *`, async () => {
	console.log("working epiccc")
});
