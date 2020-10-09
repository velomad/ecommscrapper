const puppeteer = require("puppeteer");

const categories = [
	// {
	// 	"mens-footwear":
	// 		"mens-footwear/pr?sid=osp,cil&otracker=nmenu_sub_Men_0_Footwear",
	// },
	// {
	// 	"Sports Shoes":
	// 		"mens-footwear/casual-shoes/pr?sid=osp,cil,e1f&otracker=nmenu_sub_Men_0_Casual%20Shoes",
	// },
	// {
	// 	"Casual Shoes":
	// 		"mens-footwear/sports-shoes/pr?sid=osp,cil,1cu&otracker=nmenu_sub_Men_0_Sports%20Shoes",
	// },
	// {
	// 	"Formal Shoes":
	// 		"mens-footwear/formal-shoes/pr?sid=osp,cil,ssb&otracker=nmenu_sub_Men_0_Formal%20Shoes",
	// },
	// {
	// 	"Sandals Floaters":
	// 		"mens-footwear/sandals-floaters/pr?sid=osp,cil,e83&otracker=nmenu_sub_Men_0_Sandals%20%26%20Floaters",
	// },
	// {
	// 	"Flip Flops":
	// 		"mens-footwear/slippers-flip-flops/pr?sid=osp,cil,e1r&otracker=nmenu_sub_Men_0_Flip-%20Flops",
	// },
	// {
	// 	Loafers:
	// 		"mens-footwear/casual-shoes/loafers~type/pr?sid=osp%2Ccil%2Ce1f&otracker=nmenu_sub_Men_0_Loafers",
	// },
	// {
	// 	Boots:
	// 		"mens-footwear/casual-shoes/boots~type/pr?sid=osp%2Ccil%2Ce1f&otracker=nmenu_sub_Men_0_Boots",
	// },
	// {
	// 	"Running Shoes":
	// 		"mens-footwear/sports-shoes/running-shoes~type/pr?sid=osp,cil,1cu&otracker=nmenu_sub_Men_0_Running%20Shoes",
	// },
	// {
	// 	Sneakers:
	// 		"mens-footwear/casual-shoes/sneakers~type/pr?sid=osp%2Ccil%2Ce1f&otracker=nmenu_sub_Men_0_Sneakers",
	// },
	// {
	// 	Clothing:
	// 		"clothing-and-accessories/pr?sid=clo&otracker=categorytree&p%5B%5D=facets.ideal_for%255B%255D%3DMen&otracker=nmenu_sub_Men_0_Clothing",
	// },
	// {
	// 	"Top wear":
	// 		"clothing-and-accessories/topwear/pr?sid=clo%2Cash&otracker=categorytree&p%5B%5D=facets.ideal_for%255B%255D%3DMen&otracker=nmenu_sub_Men_0_Top%20wear",
	// },
	// {
	// 	"T-Shirts":
	// 		"clothing-and-accessories/topwear/tshirt/men-tshirt/pr?sid=clo,ash,ank,edy&otracker=categorytree&otracker=nmenu_sub_Men_0_T-Shirts",
	// },
	// {
	// 	"Formal Shirts":
	// 		"clothing-and-accessories/topwear/shirt/men-shirt/formal-shirt/pr?sid=clo,ash,axc,mmk,bk1&otracker=categorytree&otracker=nmenu_sub_Men_0_Formal%20Shirts",
	// },
	// {
	// 	"Casual Shirts":
	// 		"clothing-and-accessories/topwear/shirt/men-shirt/casual-shirt/pr?sid=clo,ash,axc,mmk,kp7&otracker=categorytree&otracker=nmenu_sub_Men_0_Casual%20Shirts",
	// },
	// {
	// 	"Bottom wear":
	// 		"clothing-and-accessories/bottomwear/pr?sid=clo%2Cvua&otracker=categorytree&p%5B%5D=facets.ideal_for%255B%255D%3DMen&otracker=nmenu_sub_Men_0_Bottom%20wear",
	// },
	// {
	// 	Jeans:
	// 		"clothing-and-accessories/bottomwear/jeans/men-jeans/pr?sid=clo,vua,k58,i51&otracker=categorytree&otracker=nmenu_sub_Men_0_Jeans",
	// },
	// {
	// 	"Casual Trousers":
	// 		"mens-clothing/trousers/pr?sid=2oq,s9b,9uj&otracker=nmenu_sub_Men_0_Casual%20Trousers",
	// },
	// {
	// 	"Formal Trousers":
	// 		"clothing-and-accessories/bottomwear/trouser/men-trouser/pr?sid=clo%2Cvua%2Cmle%2Clhk&otracker=categorytree&p%5B%5D=facets.occasion%255B%255D%3DFormal&otracker=nmenu_sub_Men_0_Formal%20Trousers",
	// },
	// {
	// 	"Track pants":
	// 		"clothing-and-accessories/bottomwear/track-pants/men-track-pants/pr?sid=clo,vua,jlk,6ql&otracker=categorytree&otracker=nmenu_sub_Men_0_Track%20pants",
	// },
	// {
	// 	Shorts:
	// 		"clothing-and-accessories/bottomwear/shorts/men-shorts/pr?sid=clo,vua,e8g,kc7&otracker=categorytree&otracker=nmenu_sub_Men_0_Shorts",
	// },
	// {
	// 	Cargos:
	// 		"clothing-and-accessories/bottomwear/cargo/men-cargo/pr?sid=clo,vua,rqy,nli&otracker=categorytree&otracker=nmenu_sub_Men_0_Cargos",
	// },
	// {
	// 	"Three Fourths":
	// 		"clothing-and-accessories/bottomwear/threefourths/men-threefourths/pr?sid=clo,vua,eum,4qq&otracker=categorytree&otracker=nmenu_sub_Men_0_Three%20Fourths",
	// },
	// {
	// 	"Suits, Blazers & Waistcoats":
	// 		"clothing-and-accessories/blazers-suits-waistcoat-coat/pr?sid=clo%2Cupk&otracker=categorytree&p%5B%5D=facets.ideal_for%255B%255D%3DMen&otracker=nmenu_sub_Men_0_Suits%2C%20Blazers%20%26%20Waistcoats",
	// },
	// {
	// 	"Ties, Socks, Caps & More":
	// 		"clothing-and-accessories/clothing-accessories/pr?sid=clo,qd8&p[]=facets.ideal_for%255B%255D%3DMen&p[]=facets.ideal_for%255B%255D%3Dmen&p[]=facets.ideal_for%255B%255D%3Dmen&otracker=categorytree&otracker=nmenu_sub_Men_0_Ties%2C%20Socks%2C%20Caps%20%26%20More",
	// },
	// {
	// 	"Winter Wear":
	// 		"clothing-and-accessories/winter-wear/pr?sid=clo%2Cqvw&otracker=categorytree&p%5B%5D=facets.ideal_for%255B%255D%3DMen&otracker=nmenu_sub_Men_0_Winter%20Wear",
	// },
	// {
	// 	Sweatshirts:
	// 		"clothing-and-accessories/winter-wear/sweatshirt/men-sweatshirt/pr?sid=clo,qvw,64a,vui&otracker=categorytree&otracker=nmenu_sub_Men_0_Sweatshirts",
	// },
	// {
	// 	Jackets:
	// 		"clothing-and-accessories/winter-wear/jackets/men-jackets/pr?sid=clo,qvw,z0g,jbm&otracker=categorytree&otracker=nmenu_sub_Men_0_Jackets",
	// },
	// {
	// 	Sweater:
	// 		"clothing-and-accessories/winter-wear/sweater/men-sweater/pr?sid=clo,qvw,vkb,ieq&otracker=categorytree&otracker=nmenu_sub_Men_0_Sweater",
	// },
	// {
	// 	Tracksuits:
	// 		"clothing-and-accessories/tracksuit/men-tracksuit/pr?sid=clo,nyk,zp4&otracker=categorytree&otracker=nmenu_sub_Men_0_Tracksuits",
	// },
	// {
	// 	"Ethnic wear":
	// 		"clothing-and-accessories/ethnic-wear/pr?sid=clo%2Ccfv&otracker=categorytree&p%5B%5D=facets.ideal_for%255B%255D%3DMen&otracker=nmenu_sub_Men_0_Ethnic%20wear",
	// },
	// {
	// 	Kurta:
	// 		"clothing-and-accessories/ethnic-wear/kurtas/men-kurtas/pr?sid=clo,cfv,cib,jks&otracker=categorytree&otracker=nmenu_sub_Men_0_Kurta",
	// },
	// {
	// 	"Ethnic Sets":
	// 		"clothing-and-accessories/ethnic-wear/ethnic-sets/men-ethnic-sets/pr?sid=clo,cfv,itg,pme&otracker=categorytree&otracker=nmenu_sub_Men_0_Ethnic%20Sets",
	// },
	// {
	// 	"Ethnic Pyjama":
	// 		"clothing-and-accessories/ethnic-wear/ethnic-pyjama/men-ethnic-pyjama/pr?sid=clo,cfv,e1p,5l2&otracker=categorytree&otracker=nmenu_sub_Men_0_Ethnic%20Pyjama",
	// },

	// {
	// 	"Innerwear & Loungewear":
	// 		"clothing-and-accessories/~cs-axj382hyd1/pr?sid=clo&collection-tab-name=Innerwear%20And%20Loungewear&otracker=nmenu_sub_Men_0_Innerwear%20%26%20Loungewear",
	// },
	// {
	// 	"Briefs & Trunks":
	// 		"clothing-and-accessories/innerwear/brief-and-trunk/men-brief-and-trunk/pr?sid=clo,qfl,szr,3xl&otracker=categorytree&otracker=nmenu_sub_Men_0_Briefs%20%26%20Trunks",
	// },
	// {
	// 	Boxers:
	// 		"clothing-and-accessories/innerwear/boxers/men-boxers/pr?sid=clo,qfl,1pt,jlb&otracker=categorytree&otracker=nmenu_sub_Men_0_Boxers",
	// },
	// {
	// 	"Pyjamas and Lounge Pants":
	// 		"clothing-and-accessories/sleepwear/pyjamas-and-lounge-pants/men-pyjamas-and-lounge-pants/pr?sid=clo,1hc,a7m,b4p&otracker=categorytree&otracker=nmenu_sub_Men_0_Pyjamas%20and%20Lounge%20Pants",
	// },
	// {
	// 	"Night Suits":
	// 		"clothing-and-accessories/sleepwear/night-suits/men-night-suits/pr?sid=clo,1hc,5d2,dos&otracker=categorytree&otracker=nmenu_sub_Men_0_Night%20Suits",
	// },
	// {
	// 	"Raincoats & Windcheaters":
	// 		"clothing-and-accessories/~cs-4ayq68p3ip/pr?sid=clo&collection-tab-name=Raincoats%20And%20Windcheaters&otracker=nmenu_sub_Men_0_Raincoats%20%26%20Windcheaters",
	// },
	{
		Fastrack:
			"watches/fastrack~brand/pr?sid=r18&otracker=nmenu_sub_Men_0_Fastrack",
	},
	// { Casio: "watches/casio~brand/pr?sid=r18&otracker=nmenu_sub_Men_0_Casio" },
	// { Titan: "watches/titan~brand/pr?sid=r18&otracker=nmenu_sub_Men_0_Titan" },
	// { Fossil: "watches/fossil~brand/pr?sid=r18&otracker=nmenu_sub_Men_0_Fossil" },
	// { Sonata: "watches/sonata~brand/pr?sid=r18&otracker=nmenu_sub_Men_0_Sonata" },
	// {
	// 	Backpacks:
	// 		"bags-wallets-belts/bags-backpacks/backpacks/pr?sid=reh,4d7,ak9&otracker=nmenu_sub_Men_0_Backpacks",
	// },
	// {
	// 	Wallets:
	// 		"bags-wallets-belts/wallets-clutches/wallets/pr?sid=reh%2Ccca%2Ch76&marketplace=FLIPKART&p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.ideal_for%255B%255D%3DBoys&p%5B%5D=facets.serviceability%5B%5D%3Dtrue&otracker=nmenu_sub_Men_0_Wallets",
	// },
	// {
	// 	Belts:
	// 		"bags-wallets-belts/belts/~men/pr?sid=reh,wq9&otracker=nmenu_sub_Men_0_Belts",
	// },
	// {
	// 	Sunglasses:
	// 		"sunglasses/pr?p%5B%5D=facets.ideal_for%255B%255D%3DMen&sid=26x&otracker=nmenu_sub_Men_0_Sunglasses&p%5B%5D=facets.ideal_for%255B%255D%3DMen%2B%2526%2BWomen&otracker=nmenu_sub_Men_0_Sunglasses",
	// },
	// {
	// 	"Luggage & Travel":
	// 		"bags-wallets-belts/luggage-travel/pr?count=40&p%5B%5D=facets.ideal_for%255B%255D%3DBoys%2B%2526%2BGirls&p%5B%5D=facets.ideal_for%255B%255D%3DMen%2B%2526%2BWomen&p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.ideal_for%255B%255D%3DMen%2527s&p%5B%5D=facets.ideal_for%255B%255D%3DBoys&sid=reh%2Fplk&otracker=nmenu_sub_Men_0_Luggage%20%26%20Travel",
	// },
	// {
	// 	Frames:
	// 		"eyewear/frames/pr?count=40&p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.ideal_for%255B%255D%3DUnisex&sid=u73%2Fh4k&otracker=nmenu_sub_Men_0_Frames",
	// },
	// {
	// 	Jewellery:
	// 		"jewellery/pr?p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.ideal_for%255B%255D%3DBoys&sid=mcr&otracker=nmenu_sub_Men_0_Jewellery",
	// },
	// {
	// 	"Smart Watches":
	// 		"wearable-smart-devices/smart-watches/pr?sid=ajy,buh&p%5B%5D=facets.filter_standard%255B%255D%3D1&facets.availability%5b%5d=Exclude+Out+of+Stock&otracker=CLP_lhs&otracker=nmenu_sub_Men_0_Smart%20Watches",
	// },
	// {
	// 	"Smart Bands":
	// 		"wearable-smart-devices/smart-bands/pr?sid=ajy,q7p&otracker=nmenu_sub_Men_0_Smart%20Bands",
	// },
	// {
	// 	"Personal Care Appliances":
	// 		"personal-care-appliances-men-store?otracker=nmenu_sub_Men_0_Personal%20Care%20Appliances",
	// },
	// {
	// 	Trimmers:
	// 		"health-personal-care-appliances/personal-care-appliances/trimmers/pr?count=40&otracker=nmenu_sub_Men_0_Trimmers&p%5B%5D=facets.ideal_for%255B%255D%3DMen&p%5B%5D=facets.ideal_for%255B%255D%3DMen%2B%2526%2BWomen&sid=zlw%2F79s%2Fby3&otracker=nmenu_sub_Men_0_Trimmers",
	// },
	// {
	// 	Shavers:
	// 		"health-personal-care-appliances/personal-care-appliances/shavers/pr?sid=zlw,79s,u3j&otracker=nmenu_sub_Men_0_Shavers",
	// },
	// {
	// 	"Grooming Kits":
	// 		"health-personal-care-appliances/personal-care-appliances/grooming-kit/pr?sid=zlw,79s,bi7&otracker=nmenu_sub_Men_0_Grooming%20Kits",
	// },
	// {
	// 	"Footwear Club":
	// 		"men-exclusive-store?otracker=nmenu_sub_Men_0_Footwear%20Club",
	// },
	// {
	// 	"Bags & Wallet":
	// 		"mens-bags-wallet-store?otracker=nmenu_sub_Men_0_Bags%20%26%20Wallet",
	// },
	// {
	// {
	// 	Adidas:
	// 		"mens-footwear/pr?sid=osp%2Ccil&otracker=nmenu_sub_Men_0_Footwear&p%5B%5D=facets.brand%255B%255D%3DADIDAS&p%5B%5D=facets.brand%255B%255D%3DADIDAS%2BNEO&p%5B%5D=facets.brand%255B%255D%3DADIDAS%2BORIGINALS&otracker=nmenu_sub_Men_0_Adidas",
	// },
	// {
	// 	Beardo:
	// 		"beauty-and-personal-care/mens-grooming/hair-care/pr?count=40&otracker=categorytree&p%5B%5D=facets.brand%255B%255D%3DBeardo&sid=t06%2Fhb1%2Fb7e&otracker=nmenu_sub_Men_0_Beardo",
	// },
	// {
	// 	Reebok:
	// 		"mens-footwear/reebok~brand/pr?sid=osp,cil&otracker=nmenu_sub_Men_0_Reebok",
	// },
	// {
	// 	Skechers:
	// 		"mens-footwear/skechers~brand/pr?sid=osp,cil&otracker=nmenu_sub_Men_0_Skechers",
	// },
	// { Nike: "mens-footwear/nike~brand/pr?sid=osp,cil&otracker=nmenu_sub_Men" },
];

// for (var i of categories) {
// 	// console.log(JSON.stringify(Object.keys(i)).slice(2, -2).replace(/\s/g, ""));
// 	console.log(JSON.stringify(Object.values(i)).slice(2, -2));
// }

module.exports.scraper = async (url, pagesToScrape, callBack) => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.setUserAgent(
		"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
	);

	await page.setViewport({ width: 1200, height: 768 });

	function wait(ms) {
		return new Promise((resolve) => setTimeout(() => resolve(), ms));
	}
	for (var j = 0; j <= categories.length; j++) {
		for (var i = 1; i <= pagesToScrape; i++) {
			await page.goto(`${url}/${Object.values(categories[j])}&page=${i}`, {
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
						productJson.productPrice = productElement.querySelector("._1vC4OE")
							? productElement.querySelector("._1vC4OE").innerText
							: null;
						productJson.productStrike = productElement.querySelector("._3auQ3N")
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
			callBack(
				data,
				true,
				i,
				j,
				categories.length - 1,
				Object.keys(categories[j]),
			);
		}
	}
	await browser.close();
};

// deo = _3liAhj
