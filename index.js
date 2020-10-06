const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

// DB Config
const db = require("./config/keys").mongoURI;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Middlewares
app.use(cors());

const myntraScrapper = require("./routes/api/Myntra");
const flipkartScrapper = require("./routes/api/Flipkart");
const bewakoofScrapper = require("./routes/api/Bewakoof");
const ajioScrapper = require("./routes/api/Ajio");
const tataScrapper = require("./routes/api/Tata");
const fyndScrapper = require("./routes/api/Fynd");
const amazonScrapper = require("./routes/api/Amazon");

// Api's
app.use("/api/myntra", myntraScrapper);
app.use("/api/flipkart", flipkartScrapper);
app.use("/api/bewakoof", bewakoofScrapper);
app.use("/api/ajio", ajioScrapper);
app.use("/api/tata", tataScrapper);
app.use("/api/fynd", fyndScrapper);
app.use("/api/amazon", amazonScrapper);

// Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB successfully connected"))
	.catch((err) => console.log(err));

app.listen(port, () => {
	console.log(`Server Running at ${port}`);
});
