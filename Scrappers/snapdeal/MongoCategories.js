const express = require("express");
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const Category = require("./CategoriesSchema.js");


router.post("/snapcategory", (req, res) => {

    Category.findOneAndUpdate({ docID: '5f861692322b6a3a485dd350' }, {
        $set: {
            numberOfWebsites: 4,
            websites: ["Myntra", "Flipkart", "Snapdeal", "Ajio"],
            Myntra: [
                {
                    men: {
                        topwear: ['tshirts', 'sweaters'],
                        indianwear: ["kurtas", "sherwani"],
                        bottomwear: ["jeans", "casual trousers"],
                        innerwear: ["innerwear", "briefs-and-trunks"],
                        footwear: ["casual shoes", "sports shoes"],
                        sportswear: ["sports wear", "sports shoes"],
                        accessories: ["sunglasses", "wallets"]
                    },
                    women: {
                        indianwear: ['tshirts', 'sweaters'],
                        westernwear: ['tshirts', 'sweaters'],
                        footwear: ['tshirts', 'sweaters'],
                        sportswear: ['tshirts', 'sweaters'],
                        sleepwear: ['tshirts', 'sweaters'],
                        personalcare: ['tshirts', 'sweaters'],
                        accessories: ['tshirts', 'sweaters']
                    }
                }
            ],
            Flipkart: [
                {
                    men: {
                        topwear: ['tshirts', 'sweaters'],
                        indianwear: ["kurtas", "sherwani"],
                        bottomwear: ["jeans", "casual trousers"],
                        innerwear: ["innerwear", "briefs-and-trunks"],
                        footwear: ["casual shoes", "sports shoes"],
                        sportswear: ["sports wear", "sports shoes"],
                        accessories: ["sunglasses", "wallets"]
                    },
                    women: {
                        indianwear: ['tshirts', 'sweaters'],
                        westernwear: ['tshirts', 'sweaters'],
                        footwear: ['tshirts', 'sweaters'],
                        sportswear: ['tshirts', 'sweaters'],
                        sleepwear: ['tshirts', 'sweaters'],
                        personalcare: ['tshirts', 'sweaters'],
                        accessories: ['tshirts', 'sweaters']
                    }
                }
            ],
            Snapdeal: [
                {
                    men: {
                        topwear: ['tshirts', 'sweaters'],
                        indianwear: ["kurtas", "sherwani"],
                        bottomwear: ["jeans", "casual trousers"],
                        innerwear: ["innerwear", "briefs-and-trunks"],
                        footwear: ["casual shoes", "sports shoes"],
                        sportswear: ["sports wear", "sports shoes"],
                        accessories: ["sunglasses", "wallets"]
                    },
                    women: {
                        indianwear: ['tshirts', 'sweaters'],
                        westernwear: ['tshirts', 'sweaters'],
                        footwear: ['tshirts', 'sweaters'],
                        sportswear: ['tshirts', 'sweaters'],
                        sleepwear: ['tshirts', 'sweaters'],
                        personalcare: ['tshirts', 'sweaters'],
                        accessories: ['tshirts', 'sweaters']
                    }
                }
            ],
            Ajio: [
                {
                    men: {
                        topwear: ['tshirts', 'sweaters'],
                        indianwear: ["kurtas", "sherwani"],
                        bottomwear: ["jeans", "casual trousers"],
                        innerwear: ["innerwear", "briefs-and-trunks"],
                        footwear: ["casual shoes", "sports shoes"],
                        sportswear: ["sports wear", "sports shoes"],
                        accessories: ["sunglasses", "wallets"]
                    },
                    women: {
                        indianwear: ['tshirts', 'sweaters'],
                        westernwear: ['tshirts', 'sweaters'],
                        footwear: ['tshirts', 'sweaters'],
                        sportswear: ['tshirts', 'sweaters'],
                        sleepwear: ['tshirts', 'sweaters'],
                        personalcare: ['tshirts', 'sweaters'],
                        accessories: ['tshirts', 'sweaters']
                    }
                }
            ]

        }
    },
        { new: true })
        .then((docs) => {
            res.json({ msg: 'Category Updated...', data: docs })
        }).catch((err) => {
            res.json({ msg: 'Error Updating Category ...' })
        })
});

router.get("/categories/read", (req, res) => {
    console.log('Category Read 1')
    Category.find({})
        .then(caty => {
            console.log('Category Read 2')
            res.json({
                data: caty,
            });
        })
        .catch(err => console.log(err));
});

module.exports = router;
