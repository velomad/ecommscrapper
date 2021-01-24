const express = require("express");
const router = express.Router();
const ajioScrapper = require("../../Scrappers/ajio/scraper");
const { ajioBaseUrl } = require("../../config/keys");

const pool = require("../../db");
const { values } = require("../../Scrappers/ajio/categories");

router.get("/", (req, res) => {
  var pagesToScrape = 1;

  console.log("starting to scrap...");
  ajioScrapper.scraper(ajioBaseUrl, pagesToScrape, (data, response) => {
    if (response) {
      console.log(data);

      let arry = [];

      data.map((el) => {
        arry.push([
          el.website,
          el.category,
          el.displayCategory,
          el.gender,
          el.productName,
          el.brandName,
          el.imageUrl,
          el.discountPercent,
          el.productPrice,
          el.productPriceStrike,
          el.productLink,
          el.size,
          el.productRating,
        ]);
      });

      //   console.log(arry);

      let sql =
        "INSERT INTO products (website, category, displayCategory, gender, productName, brandName, imageUrl, discountPercent, productPrice, productPriceStrike, productLink, size, productRating) VALUES ?";
      const values = [arry];
      pool.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      });
    }
  });
});

module.exports = router;
