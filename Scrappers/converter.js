const { default: Axios } = require("axios");

const tet = require("./test.json");

// (function () {
// 	Axios.get("./test.json").then((resp) => {
// 		console.log(resp);
// 	});
// })();

// console.log(tet.Tatacliq.men.bottomwear);

tet.Snapdeal.men.topwear.map(el => {
    console.log(el.replace(/\s/g, "-").toLowerCase())
})
