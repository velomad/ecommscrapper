module.exports = {
	convertStringToNumber: (number) => {
		var regExpr = /[^0-9.]/g;
		if (typeof number == "number") number = number.toString();
		if (typeof number == "string") number = number.replace(regExpr, "");
		return number ? Math.round(number * 100) / 100 : "";
	},
};
