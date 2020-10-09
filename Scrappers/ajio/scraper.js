const { default: Axios } = require("axios");

const categories = [
	{ "Jackets & Coats": 830216010 },
	// { Jeans: 830216001 },
	// { Shirts: 830216013 },
	// { "Shorts & 3/4ths": 830216002 },
	// { "Sweatshirts & Hoodies": 830216011 },
	// { "Track Pants": 830216003 },
	// { "Trousers & Pants": 830216004 },
	// { "T-Shirts": 830216014 },
	// { Kurtas: 83 },
	// { "Nehru Jackets": 83 },
	// { Shirts: 86 },
	// { "Casual Shoes": 830207006 },
	// { "Flip-Flops & Slippers": 830207001 },
	// { "Formal Shoes": 830207007 },
	// { Sneakers: 830207010 },
	// { "Sports Shoes": 830207008 },
	// { Briefs: 830211002 },
	// { "Trunks & Boxers": 830211006 },
	// { Vests: 830211006 },
	// { Backpacks: 830201001 },
	// { "Bags & Wallets": 830201 },
	// { Belts: 830201007 },
	// { "Caps & Hats": 830202001 },
	// { "Fashion Accessories": 830205 },
	// { Socks: 830202002 },
	// { Sunglasses: 830204003 },
	// { Wallets: 830201 },
	// "Watches"
];

module.exports.scraper = (url, pagesToScrape, callBack) => {
	console.log("hello");
	for (var j = 0; i < categories.length; i++) {
		console.log(j)
		for (var i = 0; i < pagesToScrape; i++) {
			let data = [];
			var URL = `${url}api/category/${Object.values(
				categories[j],
			)}?fields=SITE&currentPage=${i}&pageSize=45&format=json&query=%3Arelevance&sortBy=relevance&gridColumns=3&advfilter=true`;
			console.log(URL);
			Axios.get(URL)
				.then((resp) => {
					console.log(resp);
					var rawData = resp.data.products;
					console.log(rawData);
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

					callBack(data, i, j, categories.length - 1, true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
};
