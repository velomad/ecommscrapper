const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  docID: {
    type: String
  },
  numberOfWebsites: {
    type: Number
  },
  websites: [String],
  Myntra: [
    {
      men: {
        topwear: [String],
        indianwear: [String],
        bottomwear: [String],
        innerwear: [String],
        footwear: [String],
        sportswear: [String],
        accessories: [String]
      },
      women: {
        indianwear: [String],
        westernwear: [String],
        footwear: [String],
        sportswear: [String],
        sleepwear: [String],
        personalcare: [String],
        accessories: [String]
      }
    }
  ],
  Flipkart: [
    {
      men: {
        topwear: [String],
        indianwear: [String],
        bottomwear: [String],
        innerwear: [String],
        footwear: [String],
        sportswear: [String],
        accessories: [String]
      },
      women: {
        indianwear: [String],
        westernwear: [String],
        footwear: [String],
        sportswear: [String],
        sleepwear: [String],
        personalcare: [String],
        accessories: [String]
      }
    }
  ],
  Snapdeal: [
    {
      men: {
        topwear: [String],
        indianwear: [String],
        bottomwear: [String],
        innerwear: [String],
        footwear: [String],
        sportswear: [String],
        accessories: [String]
      },
      women: {
        indianwear: [String],
        westernwear: [String],
        footwear: [String],
        sportswear: [String],
        sleepwear: [String],
        personalcare: [String],
        accessories: [String]
      }
    }
  ],
  Ajio: [
    {
      men: {
        topwear: [String],
        indianwear: [String],
        bottomwear: [String],
        innerwear: [String],
        footwear: [String],
        sportswear: [String],
        accessories: [String]
      },
      women: {
        indianwear: [String],
        westernwear: [String],
        footwear: [String],
        sportswear: [String],
        sleepwear: [String],
        personalcare: [String],
        accessories: [String]
      }
    }
  ]
});

module.exports = Category = mongoose.model("SnapCategories", CategorySchema);
