const puppeteer = require("puppeteer");

module.exports.scraper = async (url, callBack) => {
	const browser = await puppeteer.launch({ 
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
		],
	});
	const page = await browser.newPage();

	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	);

	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}

	await page.goto(`${url}/training/c-msh1311128101/?q=:relevance:category:MSH1311128101:category:MSH1311128:inStockFlag:true:isLuxuryProduct:false&icid2=regu:nav:main:mnav:m1311128101:mulb:best:06:R1`, {
		waitUntil: "networkidle0",
	});

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
		await wait(1600);
		viewportIncr = viewportIncr + viewportHeight;
	}

	let data = await page.evaluate(() => {
		window.scrollTo(0, 0);
		let products = [];
		let productElements = document.querySelectorAll("._26uHe2QbvnuoUvswPtzSnX");

		productElements.forEach((productElement) => {
			let productJson = {};
			try {
				productJson.imageUrl = productElement.querySelector(
					".rnVlQIG2OU_zvETUcW0TW",
				).src;
				productJson.brandName = productElement.querySelector(
					"._1CLeiJJCSL0f2IJrV53obi",
				).innerText;
				productJson.productName = productElement.querySelector(
					".Bt9jWqBhJEHlqtj4x2xNa",
				).innerText;
				productJson.productPrice = productElement.querySelector(
					".MZydWWaSr0xQud-F-Jwfa",
				).innerText;
				productJson.discountedPrice = productElement.querySelector(
					".MZydWWaSr0xQud-F-Jwfa",
				).innerText;
				// productJson.discountPercentage = productElement.querySelector(
				// 	".discount",
				// ).innerText;
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

// MZydWWaSr0xQud - F - Jwfa;
// dKCupF_5rtgdFHZiQ3xpQ .MZydWWaSr0xQud-F-Jwfa


