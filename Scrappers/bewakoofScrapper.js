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

	await page.goto(`${url}/men-pajamas`, {
		waitUntil: "networkidle0",
	});


	async function autoScroll(page) {
		await page.evaluate(async () => {
			var productsLength = document.querySelectorAll(".productCardBox").length;

			await new Promise((resolve, reject) => {
				// let totalHeight = 0;
				let distance = 100;
				let timer = setInterval(() => {
					// let scrollHeight = document.body.scrollHeight;
					window.scrollBy(0, distance);
					// totalHeight += distance;
					if (
						productsLength > 5
						// parseInt(
						// 	document
						// 		.querySelector(".headingInner>span")
						// 		.innerText.slice(1, -1),
						// ) - 50
					) {
						window.scrollTo(0, 0);
						clearInterval(timer);
						resolve();
					}
				}, 50);
			});
		});
	}

	await autoScroll(page);

	let data = await page.evaluate(() => {
		window.scrollTo(0, 0);
		let products = [];
		let productElements = document.querySelectorAll(".productCardBox");

		productElements.forEach((el) => {
			let productJson = {};
			try {
				productJson.imageUrl = el.querySelector(".productCardImg > div > img")
					? el.querySelector(".productCardImg > div > img").src
					: null;
				productJson.productName = el.querySelector(".productCardDetail>h3")
					? el.querySelector(".productCardDetail>h3").innerText
					: null;
				productJson.discountedPrice = el.querySelector(".discountedPriceText")
					? el.querySelector(".discountedPriceText").innerText
					: null;
				productJson.actualPrice = el.querySelector(".actualPriceText")
					? el.querySelector(".actualPriceText").innerText
					: null;
				productJson.isTrending = !!el.querySelector(
					".productStatusBox>.promotionalTagBox",
				);
				productJson.isSellingFast = !!el.querySelector(".sellingFastWrapper");
			} catch (e) {
				console.log(e);
			}
			products.push(productJson);
		});
		return products;
	});
	await wait(800);
	callBack(data, true);
	await browser.close();
};
