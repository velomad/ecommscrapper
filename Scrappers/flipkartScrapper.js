const puppeteer = require("puppeteer");

module.exports.scraper = async (url, callBack) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	);

	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}

	for (var i = 1; i <= 5; i++) {
	await page.goto(
		`${url}/clothing-and-accessories/topwear/tshirt/men-tshirt/pr?sid=clo%2Cash%2Cank%2Cedy&otracker=categorytree&otracker=nmenu_sub_Men_0_T-Shirts&page=${i}`,
		{
			waitUntil: "networkidle0",
		},
	);

	// Get the height of the rendered page
	const bodyHandle = await page.$("body");
	const { height } = await bodyHandle.boundingBox();
	await bodyHandle.dispose();

	// Scroll one viewport at a time, pausing to let content load
	const viewportHeight = page.viewport().height;
	let viewportIncr = 0;
	while (viewportIncr + viewportHeight < height) {
		await page.evaluate((_viewportHeight) => {
			window.scrollBy(0, _viewportHeight);
		}, viewportHeight);
		await wait(100);
		viewportIncr = viewportIncr + viewportHeight;
	}

	let data = await page.evaluate(() => {
		window.scrollTo(0, 0);
		let products = [];
		let productElements = document.querySelectorAll("._3O0U0u");

		productElements.forEach((productElement) => {
			let productJson = {};
			try {

				productJson.brandName = productElement.querySelector(
					"._2B_pmu",
				).innerText;
				productJson.imageUrl = productElement.querySelector(
					"img._3togXc",
				).src;
				productJson.productPrice = productElement.querySelector(
					"._1vC4OE",
				).innerText;
				productJson.productStrike = productElement.querySelector(
					"._3auQ3N",
				).innerText;
				productJson.discountPercentage = productElement.querySelector(
					".VGWI6T",
				).innerText;
			} catch (e) {
				console.log(e);
			}
			products.push(productJson);
		});
		return products;
	});
	await wait(100);
	callBack(data, true);
	}
	await browser.close();
};
