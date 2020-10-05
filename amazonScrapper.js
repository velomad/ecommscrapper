const puppeteer = require("puppeteer");

module.exports.tshirtScraper = async (url, callBack) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	);

	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}

	for (var i = 1; i <= 3; i++) {
		await page.goto(
			`${url}/s?rh=n%3A1571271031%2Cn%3A%211571272031%2Cn%3A1968024031%2Cn%3A1968120031&page=${i}&qid=1601910632&ref=lp_1968120031_pg_3`,
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

			const productElements = document.querySelectorAll(".s-expand-height");

			productElements.forEach((element) => {
				let jsonData = {};
				try {
					json.brandName = element.querySelector(".a-size-base-plus").innerText;
				} catch (e) {
					console.log(e);
				}
				products.push(jsonData);
			});
			return products;
		});
		await wait(100);
		callBack(data, true);
	}
	await browser.close();
};

// sg-col-4-of-24
// a-section a-spacing-medium a-text-center
