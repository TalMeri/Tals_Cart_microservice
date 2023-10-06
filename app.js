const express = require("express");
const app = express();
const cartRouter = require("./routes/CartRoutes");
const cookie_parser=require('cookie-parser');

app.use(cookie_parser());

app.use(express.json());
app.use("/cart/", cartRouter);

const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

(async () => {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    const mongoUri = mongod.getUri();
    
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((() => console.log('Connected Successfully'))).catch((err) => { console.error(err); })
})();

 
app.listen(3003, () => {
  console.log("Server is running on port 3003");
});

module.exports = app;