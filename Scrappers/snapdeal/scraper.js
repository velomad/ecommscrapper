const puppeteer = require("puppeteer");
const userAgent = require('user-agents');
var catgories = require('./categories.js');

module.exports.scraper = async (url, callBack) => {
	const browser = await puppeteer.launch({ 
		args: [`--proxy-server=http=194.67.37.90:3128`],
		headless: false 
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
					let getText = document.querySelector("#searchMessageContainer > div > span:nth-child(1)").textContent;
					if (
						document.querySelectorAll("#products > section > div").length > Number((getText.match(/(\d+)/)[0]/100*1).toFixed(0))
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

	// const test = [
	// 	{
	// 		men: ["socks", "jacket"],
	// 		women: ["shirt", "pant"],
	// 	},
	// ];

	var loopArry;
	for (var t of catgories) {
		loopArry = [t.men, t.women];
	}	
	for (var i = 0; i < loopArry.length; i++) {
		for (var text = 0; text < loopArry[i].length; text++) {
			const input = await page.$("#inputValEnter");
			await input.click({ clickCount: 3 });
			await input.press("Backspace");
			await wait(2000);
			await page.type("input[name=keyword]", loopArry[i][text], { delay: 20 });
			await wait(2000);
			await page.keyboard.press("Enter");
			await page.waitForNavigation();
			await wait(2000);
			await autoScroll(page);
			await wait(2000);
			let data = await page.evaluate(async () => {
				let products = [];
				let productElements = document.querySelectorAll(
					"#products > section > div",
				);

				productElements.forEach((el) => {
					let productJson = {};
					try {
						productJson.productName = el.querySelector(".product-title")
							? el.querySelector(".product-title").innerText
							: null;
						productJson.imageUrl = el.querySelector(".product-image")
							? el.querySelector(".product-image").srcset
							: null;
						productJson.productPrice = el.querySelector(".lfloat.product-price")
							? el.querySelector(".lfloat.product-price").innerText
							: null;
						productJson.discountedPrice = el.querySelector(
							".lfloat.product-desc-price.strike",
						)	
							? el.querySelector(".lfloat.product-desc-price.strike").innerText
							: null;
						productJson.discountPercentage = el.querySelector(
							".product-discount",
						)
							? el.querySelector(".product-discount").innerText
							: null;
					} catch (e) {
						console.log(e);
					}
					products.push(productJson);
				});
				return products;
			});
			await wait(1000);
			callBack(data, true,loopArry[i][text]);
		}
	}

	await browser.close();
};
