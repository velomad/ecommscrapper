const puppeteer = require("puppeteer");
const userAgent = require('user-agents');
var catgories = require('./categories.js');

module.exports.scraper = async (url, callBack) => {
	const browser = await puppeteer.launch({
		headless: true,
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
		],
	});
	const page = await browser.newPage();
	await page.setUserAgent(userAgent.toString());
	// await page.setUserAgent(
	// 	"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	// );

	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}

	await page.goto(`${url}`, {
		waitUntil: "networkidle0",
	});

	async function autoScroll(page) {
		await page.evaluate(async () => {
			await new Promise((resolve, reject) => {
				// let totalHeight = 0;
				let distance = 100;
				let timer = setInterval(() => {
					// let scrollHeight = document.body.scrollHeight;
					window.scrollBy(0, distance);
					// totalHeight += distance;
					let getText = document.querySelector(".headingInner").childNodes[1].innerText;
					let productLen = document.querySelector(".productGrid").childNodes.length - 1;
					if (
						productLen > Number((Number(getText.replace(/[{()}]/g, ''))/100*2).toFixed(0))
					) {
						getText = '';
						window.scrollTo(0, 0);
						clearInterval(timer);
						resolve();
					}
				}, 300);
			});
		});
	}

	var loopArry;
	for (var t of catgories) {
		loopArry = [t.men, t.women];
	}
	for (var i = 0; i < loopArry.length; i++) {
		for (var text = 0; text < loopArry[i].length; text++) {
			const input = await page.$(".searchInput");
			await input.click({ clickCount: 3 });
			await input.press("Backspace");
			await wait(2000);
			await page.type("input[type=text]", loopArry[i][text], { delay: 20 });
			await wait(2000);
			await page.keyboard.press("Enter");
			await page.waitForNavigation();
			await wait(2000);
			await autoScroll(page);
			await wait(2000);
			let data = await page.evaluate(() => {
				window.scrollTo(0, 0);
				let products = [];
				let productElements = document.querySelectorAll(".productCardBox");

				productElements.forEach((el) => {
					let productJson = {};
					try {
						productJson.website = "bewaakoof",
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
			await wait(1000);
			callBack(data, true, loopArry[i][text]);
		}
	}

	await browser.close();
};
