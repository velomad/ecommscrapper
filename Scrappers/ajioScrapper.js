const puppeteer = require("puppeteer");
const { default: Axios } = require("axios");

module.exports.scraper = async (url, callBack) => {
	let data = [];

	const getAjioData = (page) => {
		Axios.get(
			`${url}/api/category/830216014?fields=SITE&currentPage=${page}&pageSize=100&format=json&query=%3Arelevance&sortBy=relevance&gridColumns=3&advfilter=true`,
		)
			.then((resp) => {
				var rawData = resp.data.products;
				rawData.forEach((el) => {
					data.push({
						productName: el.name,
						brandName: el.fnlColorVariantData.brandName,
						imageUrl: el.fnlColorVariantData.outfitPictureURL,
						discountPercent: el.discountPercent,
						couponStatus: el.couponStatus,
						price: el.price.displayformattedValue,
						priceStrike: el.wasPriceData.displayformattedValue,
						productLink: `https://ajio.com${el.url}`,
						size: el.productSizeData ? el.productSizeData.sizeVariants : null,
					});
				});
				callBack(data, true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	for (var i = 1; i <= 10; i++) {
		getAjioData(1);
	}
};
