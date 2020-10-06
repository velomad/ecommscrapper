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

	for (var i = 2; i <= 10; i++) {
	await page.goto(
		`${url}/s?rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968120031&page=${i}&qid=1602005045&ref=lp_1968120031_pg_${i}`,
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
		await wait(300);
		viewportIncr = viewportIncr + viewportHeight;
	}

	let data = await page.evaluate(() => {
		window.scrollTo(0, 0);
		let products = [];
		let productElements = document.querySelectorAll(".celwidget");

		productElements.forEach((productElement) => {
			let productJson = {};
			try {

				// productJson.brandName = productElement.querySelector(
				// 	"a-size-base-plus",
				// ).innerText;
				productJson.imageUrl = productElement.querySelector(
					".aok-relative",
				).src;
				productJson.productPrice = productElement.querySelector(
					".a-price-whole",
				).innerText;
				// productJson.productStrike = productElement.querySelector(
				// 	"._3auQ3N",
				// ).innerText;
				// productJson.discountPercentage = productElement.querySelector(
				// 	".VGWI6T",
				// ).innerText;
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



// https://www.amazon.in/s?rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968120031&page=1&qid=1602005045&ref=lp_1968120031_pg_1
// https://www.amazon.in/s?rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968120031&page=2&qid=1602005045&ref=lp_1968120031_pg_2
// https://www.amazon.in/s?rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968120031&page=3&qid=1602005045&ref=lp_1968120031_pg_3