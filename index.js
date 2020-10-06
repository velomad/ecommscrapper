const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

// DB Config
const db = require("./config/keys").mongoURI;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Middlewares
app.use(cors());

const MyntraScrapper = require('./routes/api/Myntra.js');

// Api's
app.use('/api/myntra', MyntraScrapper);

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});

