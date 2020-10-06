const puppeteer = require("puppeteer");

module.exports.scraper = async (url, callBack) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
    
	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	);

	await page.setViewport({ width: 1200, height: 768 });

	// function wait(ms) {
	// 	return new Promise((resolve) => setTimeout(() => resolve(), ms));
	// }

	await page.goto(`${url}/top-wear-for-men`, {
		waitUntil: "networkidle0",
	});

	// // Get the height of the rendered page
	// const bodyHandle = await page.$("body");
	// const { height } = await bodyHandle.boundingBox();
	// await bodyHandle.dispose();

	// // Scroll one viewport at a time, pausing to let content load
	// const viewportHeight = page.viewport().height;
	// let viewportIncr = 0;
	// while (viewportIncr + viewportHeight < height) {
	// 	await page.evaluate((_viewportHeight) => {
	// 		window.scrollBy(0, _viewportHeight);
	// 	}, viewportHeight);
	// 	await wait(1200);
	// 	viewportIncr = viewportIncr + viewportHeight;
	// }


	let data = await page.evaluate(() => {
		window.scrollTo(0, 0);
		let products = [];
		let productElements = document.querySelectorAll(".productCardBox");

		productElements.forEach((productElement) => {
			let productJson = {};
			try {
				productJson.imageUrl = productElement.querySelector(
					".productCardImg > div > img",
				).src;
				productJson.productPrice = productElement.querySelector(
					".discountedPriceText",
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
	await browser.close();
};
