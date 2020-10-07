const { default: Axios } = require("axios");

module.exports.scraper = (url, callBack) => {
	var data = [];

	const getFyndData = (nextPageId) => {
		Axios.get(
			`${url}/api/platform/content/v1/products/?department=men&l2_category=polos-t-shirts&page_id=${nextPageId}&page_size=12&image_size=large&sort=min`,
			{
				headers: {
					accept: "application/json, text/plain, */*",
					"accept-language": "en-US,en;q=0.9",
					"sec-ch-ua":
						'"\\\\Not;A\\"Brand";v="99", "Google Chrome";v="85", "Chromium";v="85"',
					"sec-ch-ua-mobile": "?0",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
					"x-application-id": "000000000000000000000001",
					"x-application-token": "9502d710-5a22-11e9-a001-57d85417c280",
					"x-currency-code": "INR",
					cookie:
						"ajs_user_id=null; ajs_group_id=null; anonymous_id=568ed9d0775c4f80b814bbdcec312979; _ga=GA1.2.1986586595.1601977331; _gid=GA1.2.157579119.1601977331; _fw_crm_v=cedf8f12-27d1-46fa-b3da-4a9f9b640b7b",
				},
				referrer:
					"https://www.fynd.com/products/?department=men&l2_category=polos-t-shirts",
				referrerPolicy: "strict-origin-when-cross-origin",
				body: null,
				method: "GET",
				mode: "cors",
			},
		)
			.then((resp) => {
				const rawData = resp.data.items;
				console.log(resp.data.page.next_page_id);
				console.log(rawData);
				for (let i = 0; i < rawData.length; i++) {
					data.push({
						productName: rawData[i].name,
						brandName: rawData[i].brand.name,
						productLink: `${url}/product/${rawData[i].slug}`,
						imageUrl: rawData[i].images[0].secure_url,
						discount: rawData[i].discount === "" ? null : rawData[i].discount,
						price: rawData[i].price.marked.min,
						discountedPriceMinimun: rawData[i].price.effective.min,
						discountedPriceMaximum: rawData[i].price.effective.max,
					});
				}
				if (data.length < 25) {
					getFyndData(resp.data.page.next_page_id);
				} else {
					// return;
					callBack(data, true);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getFyndData("*");
};
