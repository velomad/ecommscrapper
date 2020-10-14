const puppeteer = require("puppeteer");
const categories = require("./categories");
const userAgent = require("user-agents");

module.exports.scraper = async (
	url,
	pagesToScrape,
	callBack,
) => {
	const browser = await puppeteer.launch({ 
		args: [
		`--proxy-server=http=194.67.37.90:3128`,
		'--no-sandbox',
		'--disable-setuid-sandbox'
		],
		headless: true 
	});
	const page = await browser.newPage();

	await page.setUserAgent(userAgent.toString());


	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}

	var loopArry;
	for (var t of categories) {
		loopArry = [t.men, t.women];
	}

	for (var i = 0; i < loopArry.length; i++) {
		for (var j = 0; j < loopArry[i].length; j++) {
			for (var p = 1; p <= pagesToScrape; p++) {
				await page.goto(`${url}/${Object.values(loopArry[i][j])}&page=${p}`, {
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
					let productElements = document.querySelectorAll("._3O0U0u");
					// let productElements = document.querySelectorAll(".IIdQZO");
					productElements.forEach((productElement) => {
						let productJson = {};
						try {
							productJson.brandName = productElement.querySelector("._2B_pmu")
								? productElement.querySelector("._2B_pmu").innerText
								: null;
							productJson.productName = productElement.querySelector("._2mylT6")
								? productElement.querySelector("._2mylT6").title
								: null;
							productJson.productLink = productElement.querySelector("._3dqZjq")
								? productElement.querySelector("._3dqZjq").href
								: null;
							productJson.imageUrl = productElement.querySelector("img._3togXc")
								? productElement.querySelector("img._3togXc").src
								: null;
							productJson.productPrice = productElement.querySelector(
								"._1vC4OE",
							)
								? productElement.querySelector("._1vC4OE").innerText
								: null;
							productJson.productStrike = productElement.querySelector(
								"._3auQ3N",
							)
								? productElement.querySelector("._3auQ3N").innerText
								: null;
							productJson.discountPercentage = productElement.querySelector(
								".VGWI6T",
							)
								? productElement.querySelector(".VGWI6T").innerText
								: null;
						} catch (e) {
							console.log(e);
						}
						products.push(productJson);
					});
					return products;
				});
				await wait(100);

				
				// i = current index of  outermost loop
				// loopArry.length - 1 : arrays within the array of loop and - 1 coz loop starts from index 0
				// j : current index of categories loop
				// loopArry[i].length - 1 : categories within the array and - 1 coz loop starts from index 0
				// p : current page in the loop
				// loopArry[i][j] : category name too be added in collection

				callBack(
					data,
					true,
					i,
					loopArry.length - 1,
					j,
					loopArry[i].length - 1,
					p,
					Object.keys(loopArry[i][j]),
				);
			}
		}
	}
	await browser.close();
}
