const { myntraBaseUrl, amazonBaseUrl } = require("./urls");
const myntraScrapper = require("./myntraScrapper");
const amazonScrapper = require("./amazonScrapper");

// myntraScrapper.tshirtScraper(myntraBaseUrl, (data, response) => {
// 	if (response) {
// 		console.log(data);
// 	}
// });

amazonScrapper.tshirtScraper(amazonBaseUrl, (data, response) => {
	if (response) {
		console.log(data);
	}
});
