const puppeteer = require("puppeteer");

const categories = [
	"men-topwear",
	"men-tshirts",
	"men-casual-shirts",
	// "men-formal-shirts",
	// "men-sweatshirts",
	// "men-sweaters",
	// "men-jackets",
	// "men-blazers",
	// "men-suits",
	// "rain-jacket",
	// "men-jeans",
	// "men-casual-trousers",
	// "men-formal-trousers",
	// "mens-shorts",
	// "men-trackpants",
	// "men-innerwear",
	// "men-briefs-and-trunks",
	// "men-boxers",
	// "men-innerwear-vests",
	// "men-nightwear",
	// "men-thermals",
	// "men-casual-shoes",
	// "men-sports-shoes",
	// "men-formal-shoes",
	// "men-sneakers",
	// "men-sandals",
	// "men-flip-flops",
	// "men-socks",
	// "men-personal-care",
	// "men-sunglasses",
	// "mens-watches",
	// "men-sports-wear",
	"men-sports-shoes",
	"men-sports-sandals",
	"men-sports-wear-tshirts",
	// "men-trackpants-shorts",
	// "men-tracksuits",
	// "men-sports-jackets",
	// "men-sports-accessories",
	// "men-wallets",
	// "men-belts",
	// "perfumes",
	// "trimmer",
	// "deodorant",
	// "men-belts-ties",
	// "men-accessory-gift-set",
	// "men-caps",
];

module.exports.scraper = async (url, pagesToScrape, callBack) => {
	const browser = await puppeteer.launch({
		headless: false,
		// args: ["--no-sandbox", "--disable-setuid-sandbox"],
	});
	const page = await browser.newPage();

	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	);

	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}

	for (var j = 0; j < categories.length; j++) {
		for (var i = 1; i <= pagesToScrape; i++) {
			await page.goto(`${url}/${categories[j]}?p=${i}`, {
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
				await wait(100);
				viewportIncr = viewportIncr + viewportHeight;
			}

			let data = await page.evaluate(() => {
				window.scrollTo(0, 0);
				let products = [];
				let productElements = document.querySelectorAll(".product-base");

				productElements.forEach((productElement) => {
					let productJson = {};
					let productSizeText = document.querySelector(".product-sizes")
						.innerText;
					let productSizeArr = productSizeText
						.replace("Sizes:", "")
						.trim()
						.split(",");
					try {
						productJson.productPrice =  productElement.querySelector(
							".product-discountedPrice",
						) ? productElement.querySelector(
							".product-discountedPrice",
						).innerText : null
						productJson.productLink = productElement.querySelector(
							".product-base > a",
						) ? productElement.querySelector(
							".product-base > a",
						).href : null
						productJson.brandName =  productElement.querySelector(
							".product-brand",
						) ? productElement.querySelector(
							".product-brand",
						).innerText : null
						productJson.productName =  productElement.querySelector(
							".product-product",
						) ?  productElement.querySelector(
							".product-product",
						).innerText : null
						productJson.productSizes =productSizeArr ? productSizeArr : null;
						productJson.imageUrl = productElement.querySelector(
							"picture .img-responsive",
						)
							? productElement.querySelector("picture .img-responsive").src
							: null;
						productJson.productStrike = productElement.querySelector(
							".product-strike",
						)
							? productElement.querySelector(".product-strike").innerText
							: null;
						productJson.productDiscount = productElement.querySelector(
							".product-discountPercentage",
						)
							? productElement.querySelector(".product-discountPercentage")
									.innerText
							: null;
					} catch (e) {
						console.log(e);
					}
					products.push(productJson);
				});

				return products;
			});
			await wait(100);
			callBack(data, true, i, j, categories.length - 1, categories[j]);
		}
	}
	await browser.close();
};
